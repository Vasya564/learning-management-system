import {
    BsFiletypeCsv,
    BsFiletypeDoc,
    BsFiletypeDocx,
    BsFiletypeJpg,
    BsFiletypeMp3,
    BsFiletypeMp4,
    BsFiletypePdf,
    BsFiletypePng,
    BsFiletypePpt,
    BsFiletypePptx,
    BsFiletypeTxt,
    BsFiletypeXls,
    BsFiletypeXlsx
} from 'react-icons/bs'

const FileIcon = ({ size, file }) => {
    const extensionToIcon = {
        csv: BsFiletypeCsv,
        doc: BsFiletypeDoc,
        docx: BsFiletypeDocx,
        jpg: BsFiletypeJpg,
        jpeg: BsFiletypeJpg,
        png: BsFiletypePng,
        mp3: BsFiletypeMp3,
        mp4: BsFiletypeMp4,
        pdf: BsFiletypePdf,
        xls: BsFiletypeXls,
        xlsx: BsFiletypeXlsx,
        ppt: BsFiletypePpt,
        pptx: BsFiletypePptx,
        txt: BsFiletypeTxt
    };
    const extension = file.originalName.split('.').pop();
    const IconComponent = extensionToIcon[extension] || BsFiletypeTxt;

    return <IconComponent size={size} />;
}
 
export default FileIcon;