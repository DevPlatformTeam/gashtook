export default function FormatPhoneNumberForTelLink(phoneNumber: string) {
    // Remove non-numeric characters
    const cleanedNumber = phoneNumber.replace(/[^0-9]/g, '');

    // Check if the number starts with a leading zero and remove it
    const formattedNumber = cleanedNumber.startsWith('0') ? cleanedNumber.substring(1) : cleanedNumber;

    // Return formatted tel link
    return `tel:+98${formattedNumber}`;
}