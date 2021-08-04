import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { UploadBoxStyle } from './upload.style';
import { CustomButton, UploadButton } from '@/components/button';
import {
  LabelDescriptionButton,
  LabelDescription,
  LabelSubtitleButton,
  LabelSubtitle,
} from '@/components/label';
import { NavigationBack } from '@/components/navigation/navigation-back';
import { ContentSideBar } from '@/pages/main/styles/content.style';
import { LoadingComponent } from '@/components/loading';
import { AuthContext } from '@/components/auth-context';
import { FileData } from '@/services/files';
import getRedirectUrl from '@/services/navigation';
import getApi from '@/services/api/api-service';
import UploadIcon from '@/assets/icons/cloud-upload-icon.png';

interface IUploadBox {
  selectedDoc: string;
}

export const UploadBox = ({ selectedDoc }: IUploadBox): JSX.Element => {
  console.log('🚀 selectedDoc', selectedDoc);
  const history = useHistory();
  const [frontFileData, setFrontFileData] = React.useState<FileData>();
  const [backFileData, setBackFileData] = React.useState<FileData>();
  const [isLoading, setIsLoading] = React.useState(false);
  const authData = React.useContext(AuthContext);

  const modalState = {
    front: false,
    back: false,
  };
  const [mState, setMState] = React.useState(modalState);

  const handleDeleteFront = () => setFrontFileData(undefined);
  const handleDeleteBack = () => setBackFileData(undefined);

  const handleFileExtensionAndSizeError = (fileData: FileData | undefined) => {
    if (fileData?.validExtension && fileData?.validSize) return fileData.name;

    return 'Ops! A foto enviada é diferente do formato ou tamanho aceito. Envie uma nova foto.';
  };

  const handleFileExtensionAndSizeClass = (fileData?: FileData) => {
    if (fileData === undefined) return '';

    const valid = fileData?.validExtension && fileData?.validSize;

    return valid ? '' : 'error';
  };

  const uploadLabels = (fileType: string) => {
    const fileData = fileType === 'Frente' ? frontFileData : backFileData;
    return (
      <>
        <LabelSubtitleButton
          className={` ${fileData !== undefined ? 'tiny' : ''}`}
        >
          {fileData === undefined && <img src={UploadIcon} />}
          {`${fileType} do documento`}
        </LabelSubtitleButton>
        <LabelDescriptionButton
          className={`${handleFileExtensionAndSizeClass(fileData)}`}
        >
          {fileData === undefined
            ? 'Clique para enviar ou arraste a foto aqui.'
            : handleFileExtensionAndSizeError(fileData)}
        </LabelDescriptionButton>
      </>
    );
  };

  const uploadFiles = async () => {
    if (authData.token == null || authData.globoId == null) {
      console.log('token ou globoid não informados');
      return;
    }
    const apiService = getApi(authData.token, authData.globoId);
    console.log('base64 front: ', frontFileData?.base64);
    console.log('base64 back: ', backFileData?.base64);

    if (frontFileData) {
      setIsLoading(true);
      const fileEx = frontFileData.name.split('.').pop();

      let uploadFrontRes = null;
      try {
        uploadFrontRes = await apiService.upload(
          `data:image/${fileEx};base64,${frontFileData.base64}`,
          `${selectedDoc}_FRONT`,
        );
      } catch (error) {
        console.log('Error: ', error);
        history.push('/status/error');
        return;
      }

      if ((uploadFrontRes == 201 || uploadFrontRes == 202) && backFileData) {
        console.log('RESPONSE UPLOAD FRONT: ', uploadFrontRes);
        const fileEx = backFileData.name.split('.').pop();

        let uploadBackRes = null;
        try {
          uploadBackRes = await apiService.upload(
            `data:image/${fileEx};base64,${backFileData.base64}`,
            `${selectedDoc}_BACK`,
          );
        } catch (error) {
          console.log('Error: ', error);
          history.push('/status/error');
          return;
        }

        handleUploadResponse(uploadBackRes);
        return;
      }

      handleUploadResponse(uploadFrontRes);
    }
  };

  const handleUploadResponse = async (status: number) => {
    console.log('RESPONSE UPLOAD: ', status);

    const apiService = getApi(authData.token, authData.globoId);
    const url = getRedirectUrl('accounts/attachments', status);

    if (url === 'verify') {

      let verifyRes = null;
      try {
        verifyRes = await apiService.verify();
      } catch (error) {
        console.log('Error: ', error);
        history.push('/status/error');
        return;
      }

      handleVerifyResponse(verifyRes);
    } else {
      setIsLoading(false);
      history.push(url);
    }
  };

  const handleVerifyResponse = (status: number) => {
    console.log('RESPONSE VERIFY: ', status);

    const url = getRedirectUrl('accounts/verify', status);

    setIsLoading(false);
    history.push(url);
  };

  const handleModal = (type: string) => {
    if (type == 'front') {
      setMState({ ...mState, front: !mState.front });
      return;
    }
    setMState({ ...mState, back: !mState.back });
  };

  const checkIsFileValid = ({ validExtension, validSize }: FileData) => {
    return validExtension && validSize;
  };

  const isValidFiles = () => {
    if (frontFileData == undefined && backFileData == undefined) return false;

    if (frontFileData && backFileData)
      return checkIsFileValid(frontFileData) && checkIsFileValid(backFileData);
  };

  return (
    <>
      <LoadingComponent isShow={isLoading} />
      <ContentSideBar>
        <NavigationBack />
        <UploadBoxStyle>
          <LabelSubtitle>Upload do documento</LabelSubtitle>
          <LabelDescription>
            Formatos: JPG, PNG ou BMP | O tamanho deve ser até 3 MB.
          </LabelDescription>

          <UploadButton
            id={'front'}
            fileData={frontFileData}
            onFileSelected={setFrontFileData}
            callbackDeleteFile={handleDeleteFront}
            callbackImgPreview={() => handleModal('front')}
            isShownModal={mState.front}
            typeFile="Frente do documento"
          >
            {uploadLabels('Frente')}
          </UploadButton>

          <UploadButton
            id={'back'}
            fileData={backFileData}
            onFileSelected={setBackFileData}
            callbackDeleteFile={handleDeleteBack}
            callbackImgPreview={() => handleModal('back')}
            isShownModal={mState.back}
            typeFile="Verso do documento"
          >
            {uploadLabels('Verso')}
          </UploadButton>
        </UploadBoxStyle>
        <CustomButton disabled={!isValidFiles()} callbackEvent={uploadFiles}>
          Enviar documento
        </CustomButton>
      </ContentSideBar>
    </>
  );
};