import {UploaderConfig} from '@project/shared/config/uploader';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ensureDir } from 'fx-extra';
import { writeFile } from 'node:fs/promises';
import uploaderConfig from 'libs/shared/config/uploader/src/lib/uploader.config';

@Injectable()
export class FileService {
  constructor(
    @Inject(uploaderConfig.KEY)
    private readonly applicationConfig: ConfigType < typeof uploaderConfig >,
  ) {}
  public async writeFile (file: Express.Multer.File): Promise <string> {
    const uploadDirectoryPath = this.applicationConfig.uploadDirectory;
    const destinationFile = `${uploadDirectoryPath}/${file.originalname}`;

    await ensureDir (uploadDirectoryPath);
    await writeFile (destinationFile, file.buffer);

    return destinationFile;
  }
}
