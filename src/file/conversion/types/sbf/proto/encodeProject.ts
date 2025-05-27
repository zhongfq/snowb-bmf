import { Project } from 'src/store'
import deepMapToObject from 'src/utils/deepMapToObject'

import { IProject, Project as ProjectProto } from './project'

export default function saveProject(project: Project): Uint8Array {
  // font
  if (project.style.font.fonts && project.style.font.fonts.length) {
    project.style.font.fonts.forEach(
      (fontResource) =>
        (fontResource.font = new Uint8Array(
          fontResource.font,
        ) as unknown as ArrayBuffer),
    )
  }

  // images
  project.glyphImages.forEach((glyphImage) => {
    if (glyphImage.buffer)
      glyphImage.buffer = new Uint8Array(
        glyphImage.buffer,
      ) as unknown as ArrayBuffer
  })

  // fill
  if (project.style.fill.patternTexture.buffer) {
    project.style.fill.patternTexture.buffer = new Uint8Array(
      project.style.fill.patternTexture.buffer,
    ) as unknown as ArrayBuffer
  }

  // stroke
  if (project.style.stroke.patternTexture.buffer) {
    project.style.stroke.patternTexture.buffer = new Uint8Array(
      project.style.stroke.patternTexture.buffer,
    ) as unknown as ArrayBuffer
  }

  return ProjectProto.encode(
    ProjectProto.create(deepMapToObject(project) as unknown as IProject),
  ).finish()
}
