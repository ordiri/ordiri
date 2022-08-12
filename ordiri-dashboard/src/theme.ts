import { createTheme } from "@mui/material";
import { LinkProps } from "@mui/material/Link";
import LinkBehavior from "./components/react-router-link";

export default createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
});
