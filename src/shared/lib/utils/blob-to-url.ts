export const urlByBlobString = (file: string) =>
    URL.createObjectURL(new Blob([file]))
