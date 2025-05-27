import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import { Project } from 'src/store'
import drawPackCanvas from 'src/utils/drawPackCanvas'

import toBmfInfo from './toBmfInfo'
import { ConfigItem } from './type'

export default function exportFile(
  project: Project,
  config: ConfigItem,
  fontName: string,
  fileName: string,
): void {
  // const zip = new JSZip()
  const { packCanvas, glyphList, name, layout, ui } = project
  const bmfont = toBmfInfo(project, fontName)
  let text = config.getString(bmfont)
  const saveFileName = fileName || name

  if (name !== saveFileName) {
    text = text.replace(`file="${name}.png"`, `file="${saveFileName}.png"`)
  }

  // zip.file(`${saveFileName}.${config.ext}`, text)

  const canvas = document.createElement('canvas')
  canvas.width = ui.width
  canvas.height = ui.height
  drawPackCanvas(canvas, packCanvas, glyphList, layout.padding)

  canvas.toBlob((blob) => {
    if (blob) {
      const fnt = new Blob([text], { type: 'text/xml' })
      saveAs(fnt, `${saveFileName}.${config.ext}`)
      saveAs(blob, `${saveFileName}.png`)
    }
    // if (blob) zip.file(`${saveFileName}.png`, blob)
    // zip
    //   .generateAsync({ type: 'blob' })
    //   .then((content) => saveAs(content, `${saveFileName}.zip`))
  })
}
