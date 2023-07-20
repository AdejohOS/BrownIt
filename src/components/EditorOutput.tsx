'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'

const Output = dynamic(
    async () => (await import ('editorjs-react-renderer')).default,
    {
        ssr: false
    }
)

interface EditorOutputProps {
    content: any
}

const style = {
    paragraph: {
        fontSize: '0.875',
        lineHeight: '1.25rem',
    }
}

const renderers = {
    image: CustomImageRenderer,
    code: CustomCodeRenderer,
}

const EditorOutput = ({content}: EditorOutputProps) => {
    return (
        <Output
            data={content}
            className='text-sm'
            renderers={renderers}
            style={style}
        />
    )
}

function CustomCodeRenderer({data}: any) {
    return (
        <pre className='bg-gray-900 rounded-md p-4'>
            <code className='text-gray-100'>{data.code}</code>
        </pre>
    )
}

function CustomImageRenderer({data}: any) {
    const src = data.file.url

    return (
        <div className='relative w-full min-h-[15rem]'>
            <Image
                alt='image'
                src={src}
                fill
                className='object-contain'
            />
        </div>
    )
}

export default EditorOutput