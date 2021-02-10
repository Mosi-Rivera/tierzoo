export default function collect_secs_to_str(mins)
{
    let hours = Math.floor(mins / 60);
    if (hours > 12)
        return 'max';
    let minutes = Math.floor(mins - (hours * 60));
    return (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes); 
}