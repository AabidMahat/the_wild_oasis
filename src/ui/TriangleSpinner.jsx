import { Triangle } from "react-loader-spinner";
import styled from "styled-components";

const StyledSpinner = styled.div`
  margin: 4.8rem auto;

  width: 6.4rem;
  aspect-ratio: 1;
  border-radius: 50%;
`;

function TriangleSpinner() {
  return (
    <StyledSpinner>
      <Triangle
        visible={true}
        height="220"
        width="220"
        color="blue"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </StyledSpinner>
  );
}

export default TriangleSpinner;
