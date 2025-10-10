// src/lib/firebase/storage.ts
import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
    uploadBytesResumable,
    UploadTask,
} from 'firebase/storage';
import { storage } from './config';

/**
 * Upload une image de couverture de livre
 */
export async function uploadBookCover(
    bookId: string,
    file: File,
    onProgress?: (progress: number) => void
): Promise<string> {
    try {
        const storageRef = ref(storage, `books/covers/${bookId}_cover.jpg`);

        if (onProgress) {
            // Upload avec suivi de progression
            const uploadTask = uploadBytesResumable(storageRef, file);

            return new Promise((resolve, reject) => {
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        onProgress(progress);
                    },
                    (error) => reject(error),
                    async () => {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        resolve(downloadURL);
                    }
                );
            });
        } else {
            // Upload simple
            await uploadBytes(storageRef, file);
            return await getDownloadURL(storageRef);
        }
    } catch (error) {
        console.error('Erreur upload couverture:', error);
        throw error;
    }
}

/**
 * Upload une miniature
 */
export async function uploadBookThumbnail(
    bookId: string,
    file: File
): Promise<string> {
    try {
        const storageRef = ref(storage, `books/covers/${bookId}_thumb.jpg`);
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
    } catch (error) {
        console.error('Erreur upload miniature:', error);
        throw error;
    }
}

/**
 * Supprimer une image de couverture
 */
export async function deleteBookCover(bookId: string): Promise<void> {
    try {
        const coverRef = ref(storage, `books/covers/${bookId}_cover.jpg`);
        const thumbRef = ref(storage, `books/covers/${bookId}_thumb.jpg`);

        await Promise.all([
            deleteObject(coverRef).catch(() => console.log('Cover not found')),
            deleteObject(thumbRef).catch(() => console.log('Thumb not found')),
        ]);
    } catch (error) {
        console.error('Erreur suppression couverture:', error);
        throw error;
    }
}

/**
 * Obtenir l'URL d'une couverture
 */
export async function getBookCoverUrl(bookId: string): Promise<string | null> {
    try {
        const storageRef = ref(storage, `books/covers/${bookId}_cover.jpg`);
        return await getDownloadURL(storageRef);
    } catch (error) {
        console.log('Couverture non trouvée:', bookId);
        return null;
    }
}

/**
 * Optimiser et redimensionner une image avant upload
 */
export async function optimizeImage(
    file: File,
    maxWidth: number = 800,
    maxHeight: number = 1200,
    quality: number = 0.8
): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target?.result as string;

            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                // Calculer les nouvelles dimensions
                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, width, height);

                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            resolve(blob);
                        } else {
                            reject(new Error('Erreur conversion image'));
                        }
                    },
                    'image/jpeg',
                    quality
                );
            };

            img.onerror = reject;
        };

        reader.onerror = reject;
    });
}