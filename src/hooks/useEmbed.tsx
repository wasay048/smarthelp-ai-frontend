import { useState } from 'react';
import { generateEmbedCode } from '../services/embed.service';

const useEmbed = () => {
    const [embedCode, setEmbedCode] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const createEmbedCode = async (chatId: string) => {
        setLoading(true);
        setError(null);
        try {
            const code = await generateEmbedCode(chatId);
            setEmbedCode(code);
        } catch (err) {
            setError('Failed to generate embed code.');
        } finally {
            setLoading(false);
        }
    };

    return {
        embedCode,
        loading,
        error,
        createEmbedCode,
    };
};

export default useEmbed;