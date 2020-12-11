import React, { FunctionComponent } from 'react';
import './LoaderB.scss';

const LoaderB: FunctionComponent = () =>
    <div className="grand_wrapperB">
      {/* icon from Loading.io*/}
      <svg className="bookrow" viewBox="0 0 100 100" y="0" x="0" width="47px" height="47px">
        <g className="ldl-scale">
          <g className="fourth book">
            <line className="custom-line" x1="39.187" x2="48.277" y1="9.622" y2="14.925" />
            <path className="top-outline" d="M39.446 52.778l-27.583 6.481V13.808l26.669-6.25a1.864 1.864 0 0 1 2.321 1.806v41.607a1.866 1.866 0 0 1-1.407 1.807z"></path>
            <path className="pages" d="M39.187 9.622l9.09 5.303-27.324 6.458c-4.767.07-7.797-1.698-9.09-5.303l27.324-6.458z"></path>
            <path className="coverr" d="M48.536 58.08l-27.583 6.481V19.11l26.669-6.25a1.864 1.864 0 0 1 2.321 1.806v41.607a1.865 1.865 0 0 1-1.407 1.807z"></path>
            <path className="spine" d="M11.863 13.808v45.451c1.31 4.42 4.942 5.26 9.09 5.303V19.11c-4.889.005-7.919-1.763-9.09-5.302z"></path>
          </g>
          <g className="third book">
            <line className="custom-line" x1="51.182" x2="60.508" y1="16.807" y2="22.247" />
            <path className="top-outline" d="M51.447 61.081L23.149 67.73V21.101l27.36-6.412a1.912 1.912 0 0 1 2.381 1.853v42.685a1.91 1.91 0 0 1-1.443 1.854z"></path>
            <path className="pages" d="M51.182 16.807l9.326 5.44-28.032 6.626c-4.891.071-8-1.742-9.326-5.44l28.032-6.626z"></path>
            <path className="coverr" d="M60.773 66.521L32.475 73.17V26.541l27.36-6.412a1.912 1.912 0 0 1 2.381 1.853v42.685c0 .876-.595 1.64-1.443 1.854z"></path>
            <path className="spine" d="M23.149 21.101V67.73c1.344 4.535 5.07 5.397 9.326 5.44V26.541c-5.015.005-8.124-1.808-9.326-5.44z"></path></g>
          <g className="second book">
            <line className="custom-line" x1="63.769" x2="73.338" y1="25.255" y2="30.866" />
            <path className="top-outline" d="M64.043 70.921l-29.187 6.858V29.685l28.22-6.613a1.971 1.971 0 0 1 2.455 1.911V69.01c0 .902-.613 1.69-1.488 1.911z"></path>
            <path className="pages" d="M63.769 25.255l9.619 5.611L44.475 37.7c-5.045.074-8.251-1.797-9.619-5.611l28.913-6.834z"></path>
            <path className="coverr" d="M73.662 76.532L44.475 83.39V35.296l28.22-6.613a1.971 1.971 0 0 1 2.455 1.911v44.027c0 .902-.613 1.69-1.488 1.911z"></path>
            <path className="spine" d="M34.856 29.685V77.78c1.387 4.677 5.229 5.566 9.619 5.611V35.296c-5.173.004-8.379-1.866-9.619-5.611z"></path>
          </g>
          <g className="first book">
            <line className="custom-line" x1="76.462" x2="86.33" y1="32.858" y2="38.614" />
            <path className="top-outline" d="M76.743 79.708l-29.944 7.036V37.402l28.951-6.785a2.023 2.023 0 0 1 2.519 1.961v45.168c0 .927-.629 1.734-1.526 1.962z"></path>
            <path className="pages" d="M76.462 32.858l9.868 5.756-29.663 7.011c-5.175.075-8.465-1.843-9.868-5.756l29.663-7.011z"></path>
            <path className="coverr" d="M86.611 85.464L56.667 92.5V43.159l28.951-6.785a2.023 2.023 0 0 1 2.519 1.961v45.168c0 .926-.628 1.734-1.526 1.961z"></path>
            <path className="spine" d="M46.799 37.402v49.341c1.423 4.798 5.365 5.71 9.868 5.756v-49.34c-5.307.005-8.596-1.914-9.868-5.757z"></path>
          </g>
        </g>
      </svg>
      <p>Loading...</p>
    </div>;

export default LoaderB;
