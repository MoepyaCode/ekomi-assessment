import fs from 'fs'
import path from 'path'

function getDataFilePath(fileName: string): string {
    return path.join(__dirname, '../../data', fileName);
}

export async function getFileData(fileName: string): Promise<[]> {
    const filePath = getDataFilePath(fileName);
    return JSON.parse((await fs.promises.readFile(filePath, 'utf-8')))
}