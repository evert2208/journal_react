export const fileUpload = async(file) => {
    if (!file) throw new Error('no hay archivo');

    const cloudUrl = 'https://api.cloudinary.com/v1_1/react-proyect/upload';
    const formData = new FormData();
    formData.append('upload_preset', 'journal-react');
    formData.append('file', file);

    try {

        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });

        if (!resp.ok) throw new Error('no se pudo subir el archivo');

        const cloudResp = await resp.json();

        return cloudResp.secure_url;

    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}