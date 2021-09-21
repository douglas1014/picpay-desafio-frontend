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
import { checkIsFileValid, FileData, fileExtensionAndSizeIsValid, handleGTMTypeError, isValidFiles } from '@/services/files';
import getRedirectUrl from '@/services/navigation';
import getApi from '@/services/api/api-service';
import UploadIcon from '@/assets/icons/cloud-upload-icon.png';
import { sendEvent } from '@/services/tracking';
import { checkAuthIsInvalid } from '@/services/onboarding';

interface IUploadBox {
  selectedDoc: string;
}

export const UploadBox = ({ selectedDoc }: IUploadBox): JSX.Element => {
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

  const sendEventWithAction = (action: string) => {
    if (!action) {
      return;
    }
    sendEvent('know-your-costumer', 'enviar-documento', action);
  };

  const handleDeleteFront = () => {
    sendEventWithAction('remover-frente');
    setFrontFileData(undefined);
  };

  const handleDeleteBack = () => {
    sendEventWithAction('remover-verso');
    setBackFileData(undefined);
  };

  const handleLoadFrontFile = (file: FileData) => {
    setFrontFileData(file);
    sendEventWithAction(`frente-${selectedDoc}-carregada`);
  };

  const handleLoadBackFile = (file: FileData) => {
    setBackFileData(file);
    sendEventWithAction(`verso-${selectedDoc}-carregado`);
  };

  const handleFileDataLabel = (
    fileData: FileData | undefined,
    fileType: string,
  ) => {
    if (fileData === undefined) {
      return 'Clique para enviar ou arraste a foto aqui.';
    }
    return handleFileExtensionAndSizeError(fileData, fileType);
  };

  const handleFileExtensionAndSizeError = (
    fileData: FileData | undefined,
    fileType: string,
  ) => {
    if (fileData && checkIsFileValid(fileData))
      return fileData?.name;

    fileType === 'Frente'
      ? sendEventWithAction(
        `erro-frente-${selectedDoc}-${handleGTMTypeError(
          fileData?.validExtension,
          fileData?.validSize,
        )}`,
      )
      : sendEventWithAction(
        `erro-verso-${selectedDoc}-${handleGTMTypeError(
          fileData?.validExtension,
          fileData?.validSize,
        )}`,
      );

    return "Ops! A foto enviada é diferente do formato \n ou tamanho aceito. Envie uma nova foto.";
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
          className={`${fileExtensionAndSizeIsValid(fileData)}`}
        >
          {handleFileDataLabel(fileData, fileType)}
        </LabelDescriptionButton>
      </>
    );
  };

  const uploadFiles = async () => {
    if (checkAuthIsInvalid(authData)) {
      return;
    }

    sendEventWithAction('enviar');

    const apiService = getApi(authData.token, authData.globoId);

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

  const handleNavigationBack = () => {
    sendEventWithAction('voltar-envio-documento');
  };

  return (
    <>
      <LoadingComponent isShow={isLoading} />
      <ContentSideBar>
        <NavigationBack onClickEvent={handleNavigationBack} />
        <UploadBoxStyle>
          <LabelSubtitle>Upload do documento</LabelSubtitle>
          <LabelDescription>
            Formatos: JPG, PNG ou BMP | O tamanho deve ser até 3 MB.
          </LabelDescription>

          <UploadButton
            id={'front'}
            fileData={frontFileData}
            onFileSelected={handleLoadFrontFile}
            callbackDeleteFile={handleDeleteFront}
            callbackImgPreview={() => handleModal('front')}
            onClickEvent={() => sendEventWithAction('frente')}
            isShownModal={mState.front}
            typeFile="Frente do documento"
          >
            {uploadLabels('Frente')}
          </UploadButton>

          <UploadButton
            id={'back'}
            fileData={backFileData}
            onFileSelected={handleLoadBackFile}
            callbackDeleteFile={handleDeleteBack}
            callbackImgPreview={() => handleModal('back')}
            onClickEvent={() => sendEventWithAction('verso')}
            isShownModal={mState.back}
            typeFile="Verso do documento"
          >
            {uploadLabels('Verso')}
          </UploadButton>
        </UploadBoxStyle>
        <CustomButton
          disabled={!isValidFiles(frontFileData, backFileData)}
          callbackEvent={uploadFiles}>
          Enviar documento
        </CustomButton>
      </ContentSideBar>
    </>
  );
};
