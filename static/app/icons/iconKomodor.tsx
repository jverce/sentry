import * as React from 'react';

import SvgIcon from './svgIcon';

type Props = React.ComponentProps<typeof SvgIcon>;

const IconKomodor = React.forwardRef(function IconKomodor(
  props: Props,
  ref: React.Ref<SVGSVGElement>
) {
  return (
    <SvgIcon {...props} ref={ref}>
      <path
        d="M.09 19l7.13-7.37H73l7.14 7.34v42.1L73 68.41H7.22L.09 61.07zm11.79.65l-2.79 2.77v35.21l2.79 2.81h56.5l2.68-2.81V22.42l-2.68-2.81z"
        fill="#1347ff"
      />
      <path
        d="M50.07 47.46c3.7 0 6.71-4.34 6.71-9.7s-3-9.7-6.71-9.7-6.72 4.35-6.72 9.7 3.01 9.7 6.72 9.7zM30.1 47.46c3.71 0 6.72-4.34 6.72-9.7s-3-9.7-6.72-9.7-6.71 4.35-6.71 9.7 3.01 9.7 6.71 9.7z"
        fill="#1347ff"
      />
    </SvgIcon>
  );
});

IconKomodor.displayName = 'IconKomodor';

export {IconKomodor};
