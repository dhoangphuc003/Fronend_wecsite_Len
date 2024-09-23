import styled from 'styled-components';
export const SuccessMessage = styled.h3`
  font-size: 28px;
  font-weight: bold;
  color: red;
  text-align: center;
  margin-top: 15px;
  margin-bottom: -15px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;
export const WrapperContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  max-width: 1270px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
`;

export const Lable = styled.label`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

export const WrapperInfo = styled.div`
  padding: 17px 20px;
  border-bottom: 1px solid #f5f5f5;
  background: #fff;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  width: 100%
`

export const WrapperValue = styled.div`
  background: rgb(240, 248, 255);
  border: 1px solid rgb(194, 225, 255);
  padding: 10px;
  width: fit-content;
  border-radius: 6px;
  margin-top: 4px;
`

export const WrapperItemOrderInfo = styled.div`
  margin: 20px 0;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #eee;
  &:last-child {
    border-bottom: none;
  }
`;

export const TableCell = styled.td`
  padding: 10px;
  font-size: 14px;
  color: #333;
  text-align: left;

  &:first-child {
    width: 60%;
  }
`;

export const TotalPrice = styled.div`
  margin-top: 20px;
  font-size: 18px;
  color: red;
  font-weight: bold;
  text-align: right;
`;
