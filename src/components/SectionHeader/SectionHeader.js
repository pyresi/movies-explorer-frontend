import './SectionHeader.css'

function SectionHeader({ headerText, isSubHeader = false }) {
    return (
        <h2 className={'section-header' + (isSubHeader ? ' section-header_type_sub-header ' : '')}>{headerText}</h2>
    )
}

export default SectionHeader;