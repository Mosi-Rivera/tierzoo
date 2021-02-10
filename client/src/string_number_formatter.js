export default function string_to_number_formatter(num)
{
    if (!num)
        return 0;
    if (Math.abs(num) > 999999999)
        return (num/1000000000).toFixed(1) + 'b';
    else if (Math.abs(num) > 999999)
        return (num/1000000).toFixed(1) + 'm';
    else if (Math.abs(num) > 999)
        return (num/1000).toFixed(1) + 'k';
    return num;
}