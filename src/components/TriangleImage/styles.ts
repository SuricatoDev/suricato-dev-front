import styled from 'styled-components'
import { device } from '@/styles/breakpoints'

export const Wrapper = styled.div`
  padding: 1.5em;
  width: 100%;
  height: 100%;
  max-width: calc(293px + 2em);
  max-height: calc(293px + 2em);
  @media ${device.md} {
    max-width: calc(380px + 2em);
    max-height: calc(380px + 2em);
  }
  .triangle-container {
    position: relative;

    display: grid;
    user-select: none;
    pointer-events: none;

    &::before {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 9%;
      top: 5.5%;

      content: '';
      background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="345" height="389" viewBox="0 0 345 389" fill="none"><path d="M329.364 171.582L330.117 170.285L329.364 171.582C347.876 182.334 347.789 209.064 329.2 219.694L329.946 220.996L329.2 219.694L43.2187 383.261C24.6268 393.894 1.48822 380.445 1.56009 359.064L2.67125 30.0115L1.17103 30.0054L2.67125 30.0114C2.74312 8.62875 25.9749 -4.66127 44.492 6.09439C44.492 6.0944 44.4921 6.09441 44.4921 6.09443L329.364 171.582Z" stroke="%23FF6633" stroke-width="3"/></svg>');
      background-repeat: no-repeat;
      background-size: contain;
      z-index: 1;
    }

    &::after {
      content: '';
      position: absolute;
      width: 40%;
      height: 40%;
      right: 0;
      top: 4.2%;

      background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="136" height="153" viewBox="0 0 136 153" fill="none"><path d="M2.56373 11.9283L2.56373 11.9282C2.58957 4.24121 10.9432 -0.540152 17.6033 3.32843L129.376 68.2589L130.129 66.9623L129.376 68.2589C136.031 72.1245 136.001 81.7344 129.316 85.5573L130.062 86.8593L129.316 85.5574L17.1082 149.735C10.4202 153.559 2.10192 148.72 2.12775 141.035L2.56373 11.9283Z" stroke="%23FF6633" stroke-width="3"/></svg>');
      background-size: contain;
      background-repeat: no-repeat;
      z-index: -1;
    }

    svg {
      width: 100%;
      height: 100%;
      grid-area: 1 / 1 / 2 / 2;
    }
  }

  .triangle-mask {
    mask: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="345" height="389" viewBox="0, 0, 400,451"><path d="M26.609 1.579 C 15.821 4.489,6.413 12.990,2.867 23.034 C -0.236 31.822,-1.307 420.590,1.750 428.594 C 7.677 444.115,26.912 454.186,42.548 449.956 C 50.608 447.775,384.640 256.292,390.367 250.569 C 402.853 238.094,403.074 215.782,390.835 203.421 C 384.712 197.237,51.731 3.660,43.515 1.508 C 36.591 -0.305,33.548 -0.292,26.609 1.579 " stroke="none" fill="%23000000" fill-rule="evenodd"/></svg>')
      no-repeat top center / contain;
    -webkit-mask: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="345" height="389" viewBox="0, 0, 400,451"><path d="M26.609 1.579 C 15.821 4.489,6.413 12.990,2.867 23.034 C -0.236 31.822,-1.307 420.590,1.750 428.594 C 7.677 444.115,26.912 454.186,42.548 449.956 C 50.608 447.775,384.640 256.292,390.367 250.569 C 402.853 238.094,403.074 215.782,390.835 203.421 C 384.712 197.237,51.731 3.660,43.515 1.508 C 36.591 -0.305,33.548 -0.292,26.609 1.579 " stroke="none" fill="%23000000" fill-rule="evenodd"/></svg>')
      no-repeat top center / contain;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .triangle-image {
    object-fit: cover;
    object-position: right;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
`
