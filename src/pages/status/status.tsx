import * as React from 'react';

import { useParams } from 'react-router-dom';

import { AuthContext } from '@/components/auth-context';
import {
  renderApproved,
  renderError,
  renderInProcess,
  renderIsPending,
  renderRejected,
  renderStillInProcess,
  renderSuspected,
} from './components';
import { ContentItems } from '@/pages/main/styles/content.style';
import { ModalConfirm } from '@/components/modal-confirm';

export const StatusPage: React.FC = () => {
  const authData = React.useContext(AuthContext);
  const { email: userEmail } = authData;

  const [statusState, setStatusState] = React.useState({
    isModalShow: false,
  });

  const { type } = useParams<{ type: string }>();

  const handleClickSeeLater = () => {
    setStatusState({ ...statusState, isModalShow: !statusState.isModalShow });
  };

  const getStatusType = type ? type.toLowerCase() : '';

  const renderTypeStatus = () => {
    switch (getStatusType) {
      case 'in_process':
        return renderInProcess(userEmail);
      case 'still_in_process':
        return renderStillInProcess(userEmail);
      case 'active':
        return renderRejected(handleClickSeeLater);
      case 'approved':
        return renderApproved;
      case 'suspected':
        return renderSuspected;
      case 'rejected':
        return renderRejected(handleClickSeeLater);
      case 'is_pending':
        return renderIsPending;
      case 'error':
        return renderError;
      default:
        return renderError;
    }
  };

  return (
    <>
      <ModalConfirm
        isShown={statusState.isModalShow}
        callbackHide={handleClickSeeLater}
      />
      <ContentItems>{renderTypeStatus()}</ContentItems>
    </>
  );
};