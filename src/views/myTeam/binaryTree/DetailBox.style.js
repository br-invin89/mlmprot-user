import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  container: {
    position: 'fixed',
    width: 294,
    // left: ${props=>props.left?props.left+'px':0};
    // top: ${props=>props.top?props.top+'px':0};
    zIndex: 130,

    background: theme.palette.background.panel,
    border: `1px solid ${theme.palette.border.panel}`,
    boxSizing: 'border-box',
    boxShadow: '0px 2.76726px 2.21381px rgba(0, 0, 0, 0.00843437), 0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0121168), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.015), 0px 22.3363px 17.869px rgba(0, 0, 0, 0.0178832), 0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0215656), 0px 100px 80px rgba(0, 0, 0, 0.03)',
    borderRadius: 8,
    "&:after, &:before": {
      right: '100%',
      top: '40px',
      border: 'solid transparent',
      content: " ",
      height: 0,
      width: 0,
      position: 'absolute',
      pointerEvents: 'none',
    },
    '&:after': {
      borderColor: 'rgba(255, 255, 255, 0)',
      borderRightColor: theme.palette.background.panel,
      borderWidth: '16px',
      marginTop: '-16px',
    },
    '&:before': {
      borderColor: 'rgba(230, 234, 238, 0)',
      borderRightColor: theme.palette.border.panel,
      borderWidth: '17px',
      marginTop: '-17px',
    }
  },
  headerBar: {
    textAlign: 'center',
    padding: '24px 0 11px 0',
  },
  photo: {
    width: 60,
    height: 60,
    borderRadius: '50%',
    objectFit: 'cover',
  },
  name: {
    fontSize: 12,
    margin: '12px 0 7px 0',
  },
  usernameLabel: {
    fontSize: 12,
    color: theme.palette.text.secondary,
  },
  username: {
    fontSize: 12
  },
  userLink: {
    marginTop: 6,
    fontSize: 12,
  },
  th: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    background: theme.palette.background.activePanel,
    border: `1px solid ${theme.palette.background.default}`
  },
  td: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  tf: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    textAlign: 'center',
    background: theme.palette.background. activePanel,
    border: `1px solid ${theme.palette.background.default}`
  }
}))

/*
export const Name = styled.p`
  
`
export const UsernameWrapper = styled.p`
`
export const UsernameLabel = styled.span`
`
export const Username = styled.span`
`
export const UserLink = styled.a`
`
export const Table = styled.div``
export const Thead = styled.div`
  background: #F5F8FA;
  border: 1px solid #E6EAEE;
  display: flex;
  padding: 6px 0;
`
export const Tbody = styled.div`
  margin: 4px 0;
`
export const Th1 = styled.div`
  width: calc(100% - 68px);
`
export const Th2 = styled.div`
  width: 68px;
  font-size: 12px;
  text-align: center;
`
export const Th3 = styled.div`
  width: 68px;
  font-size: 12px;
  text-align: center;
`
export const Tr = styled.div`
  display: flex;
`
export const Td1 = styled.div`
  font-size: 12px;
  color: ${props=>props.theme.colors.secondary};
  width: calc(100% - 68px);
  padding: 3px 0 3px 19px;
`
export const Td2 = styled.div`
  font-size: 12px;
  text-align: center;
  width: 68px;
  border-left: 1px solid #E6EAEE;
  padding: 3px 0;
`
export const Td3 = styled.div`
  font-size: 12px;
  text-align: center;
  width: 68px;
  border-left: 1px solid #E6EAEE;
  padding: 3px 0;
`
export const Tfoot = styled.div`
  background: #F5F8FA;
  border-top: 1px solid #E6EAEE;
  text-align: center;
  color: ${props=>props.theme.colors.secondary};
  padding: 8px 0;
  font-size: 12px;
  border-radius: 0px 0px 7px 7px;
`
*/
