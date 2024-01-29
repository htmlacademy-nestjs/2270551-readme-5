import {UploaderConfig} from '@project/shared/config/uploader';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ensureDir } from 'fs-extra';
import { writeFile } from 'node:fs/promises';
import uploaderConfig from 'libs/shared/config/uploader/src/lib/uploader.config';
import dayjs from 'dayjs';
import { extend } from 'joi';

@Injectable()
export class FileService {
  constructor(
    @Inject(uploaderConfig.KEY)
    private readonly applicationConfig: ConfigType < typeof uploaderConfig >,
  ) {}
  public async writeFile (file: Express.Multer.File): Promise <string> {
    const [year, month] = dayjs().format('YYYY MM').split(' ');
    const { uploadDirectory } = this.applicationConfig;
    const uploadDirectoryPath = `${uploadDirectory}/${year}/${month}`;

    const filename = crypto.randomUUID();
    const fileExtension = extension(file.mimetype);

    const destinationFile = `${uploadDirectoryPath}/${filename}.${fileExtension}`;

    await ensureDir (uploadDirectoryPath);
    await writeFile (destinationFile, file.buffer);

    return destinationFile;
  }
}
function extension(mimetype: string) {
  throw new Error('Function not implemented.');
}

