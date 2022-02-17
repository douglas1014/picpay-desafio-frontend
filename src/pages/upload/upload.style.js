import styled from 'styled-components';
import { device } from '@/pages/main/styles';

export const UploadBoxStyle = styled.div`
  min-height: 40px;
  padding: 16px;
  margin-bottom: 32px;
  cursor: pointer;

  border: 1px solid rgba(213, 213, 213, 0.3);
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  border-radius: 3px;

  @media ${device.tablet} {
    padding: 24px;
  }

  h3 {
    margin: 8px 0 4px 0;
    font-size: ${(props) => props.theme.fontSizes.small}

    @media ${device.tablet} {
      min-width: 336px;
      font-size: ${(props) => props.theme.fontSizes.medium}
    }
  }

  p {
    margin: 0 0 8px 0;
    color: ${(props) => props.theme.colors.grey};
  }
`;

export const ImgPreviewStyle = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  position: relative;

  min-height: 40px;
  height: 64px;
  width: 88px;

  background: #c4c4c4;
  border-radius: 8px;

  &.active {
    display: flex;
    margin: 0px 10px;
    white-space: pre-wrap;
  }

  &.invalid {
    cursor: not-allowed;
  }

  img {
    width: 60px;
    max-height: 42px;
    filter: drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.55));
    transform: matrix(1, -0.06, 0.06, 1, 0, 0);

    &.empty {
      min-height: 40px;
      height: 64px;
      width: 88px;
      max-height: 64px;

      cursor: not-allowed;

      filter: none;
      transform: none;
    }
  }

  &:after {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;

    content: '${(props) => props.content}';
    color: ${(props) => props.color};

    right: 1px;
    bottom: 2px;

    width: 24px;
    height: 24px;
    font-size: ${(props) => props.theme.fontSizes.large};
    line-height: 24px;

    background: #ffffff;
    border: 1px solid rgba(213, 213, 213, 0.2);
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
    border-radius: 50%;
  }
`;

export const DeleteButtonStyle = styled.button`
  display: none;
  justify-content: center;
  align-items: center;

  min-height: 40px;
  height: 64px;
  width: 90px;

  background: transparent;
  border: 0;

  cursor: pointer;

  &.active {
    display: flex;
  }

  @media ${device.tablet} {
    justify-content: flex-end;
  }
`;