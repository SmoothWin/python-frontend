export default function Status(props)
{

    return (<span> {(props.statusData.online)?1:0} </span> );
}