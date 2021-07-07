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
  const [frontFileData, setFrontFileData] = React.useState<FileData | undefined>(undefined);
  const [backFileData, setBackFileData] = React.useState<FileData | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState(false);
  const authData = React.useContext(AuthContext);

  const modalState = {
    front: false,
    back: false,
  }
  const [mState, setMState] = React.useState(modalState);

  const handleDeleteFront = () => setFrontFileData(undefined);
  const handleDeleteBack = () => setBackFileData(undefined);

  const handleFileExtensionError = (fileData: FileData | undefined) => {
    if (fileData?.validExtension) return fileData.name;

    return 'Ops! A foto enviada é diferente do formato ou tamanho aceito. Envie uma nova foto.';
  };

  const handleFileExtensionClass = (fileData?: FileData) => {
    if (fileData === undefined) return '';

    return fileData?.validExtension ? '' : 'error';
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
          className={`${handleFileExtensionClass(fileData)} ${fileData ? 'bold' : ''}`}
        >
          {fileData === undefined
            ? 'Clique para enviar ou arraste a foto aqui.'
            : handleFileExtensionError(fileData)}
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
      const uploadFrontRes = await apiService.upload(
        frontFileData.base64,
        selectedDoc,
      );

      if (uploadFrontRes == 201 && backFileData) {
        console.log('RESPONSE UPLOAD FRONT: ', uploadFrontRes);
        const uploadBackRes = await apiService.upload(
          backFileData.base64,
          selectedDoc,
        );
        handleUploadResponse(uploadBackRes);
        return;
      }

      handleUploadResponse(uploadFrontRes);
      // '201 - CREATED - VERIFY - ok'
      // '202 - ACCEPTED - AGUARDE - ok'
      // '412 - PRECONDITION FAILED - REJEITADO - ok'
      // '417 - EXPECTATION FAILED - APROVADO - ok'
      // '423 - LOCKED - AGUARDE - ok'
      // handleUploadResponse(412); //MOCKED - RETIRAR
    }
  };

  const handleUploadResponse = async (status: number) => {
    console.log('RESPONSE UPLOAD: ', status);

    const apiService = getApi(authData.token, authData.globoId);
    const url = getRedirectUrl('accounts/attachments', status);

    if (url === 'verify') {
      const verifyRes = await apiService.verify();
      handleVerifyResponse(verifyRes);
      //'201 - CREATED - REDIRECIONAR PARA AGUARDE - ok'
      //'200 - APPROVED - REDIRECIONAR PARA APROVADO - ok'
      //'202 - ACCEPTED - REDIRECIONAR PARA AGUARDE - ok'
      //'409 - CONFLICTED - REDIRECIONAR PAR UPLOAD - ok'
      //'412 - PRECONDITION FAILED - REDIRECIONAR PARA REPROVADO - ok'
      //'417 - EXPECTATION FAILED - REDIRECIONAR PARA UPLOAD - ok'
      //handleVerifyResponse(201); //MOCKED - RETIRAR
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
  }

  const isDisabled = frontFileData === undefined && backFileData === undefined;

  return (
    <>
      <LoadingComponent isShow={isLoading}>
        Enviando informações...
      </LoadingComponent>
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
          >
            {uploadLabels('Verso')}
          </UploadButton>
        </UploadBoxStyle>
        <CustomButton disabled={isDisabled} callbackEvent={uploadFiles}>
          Enviar documento
        </CustomButton>
      </ContentSideBar>
    </>
  );
};
