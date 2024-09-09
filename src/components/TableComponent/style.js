import styled from "styled-components";

export const ExportButton = styled.button`
  background-color: #1d1ddd;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 20px; /* Khoảng cách giữa hai nút */

  &:hover {
    background-color: #0b0b8e;
  }

  &:active {
    background-color: #00008b;
  }
`;

export const DeleteButton = styled.button`
  background-color: #000000;
  color: white;
  border: none;
  width:fit-content;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #8d8d93;
    color: #000000;
  }

  &:active {
    background-color: #00008b;
  }
`;
