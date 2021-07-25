import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { callGetApiWithAuth } from 'utils/api'

export default ({ page }) => {
  const classes = useStyles()
  const [htmlContent, setHtmlContent] = useState('')
  const [jsFiles, setJsFiles] = useState([])
  const [cssFiles, setCssFiles] = useState([])

  useEffect(() => {
    loadTemplateContent()
  }, [])
  const loadTemplateContent = () => {
    // callGetApiWithAuth(`ui/custom_page/${page}`, onGetPageContent)
  }
  const onGetPageContent = (data) => {
    setHtmlContent(data.custom_html_edition.edt_template_converted)
    let { styles, scripts } = JSON.parse(data.custom_html_edition.assets)
    setJsFiles(scripts)
    setCssFiles(styles)
  }

  return (
    <div className={classes.container}>
      {jsFiles.map((e, i) => (
        <script key={i} src={e} type='text/javascript'></script>
      ))}
      {cssFiles.map((e, i) => (
        <link key={i} href={e} type='text/css' rel='stylesheet' />
      ))}
      <div className={classes.contentBody} 
        dangerouslySetInnerHTML={{ __html: htmlContent }} 
      />
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {

  },
  contentBody: {
    
  }
}))
