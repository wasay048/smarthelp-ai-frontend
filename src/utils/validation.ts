
export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validateRequired = (value: string): boolean => {
    return value.trim().length > 0;
};

export const validateFileType = (fileName: string, allowedTypes: string[]): boolean => {
    const fileExtension = fileName.split('.').pop();
    return allowedTypes.includes(fileExtension || '');
};

export const validateFileSize = (fileSize: number, maxSize: number): boolean => {
    return fileSize <= maxSize;
};