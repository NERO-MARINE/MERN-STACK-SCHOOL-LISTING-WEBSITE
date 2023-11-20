import ReactGA from 'react-ga';

const initGA = () => {
  ReactGA.initialize('G-VBPBS1XWR1');
};

export default initGA;


// Below is using the native script without installing "react-ga"

// export const initGA = () => {
//     window.dataLayer = window.dataLayer || [];
//     function gtag() {
//       window.dataLayer.push(arguments);
//     }
//     gtag('js', new Date());
//     gtag('config', 'G-VBPBS1XWR1');
//   };