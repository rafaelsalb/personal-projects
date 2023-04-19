var Utils =
{
    toBinary: function(number, digits)
    {
        let binary = number.toString(2);
        binary = binary.length != digits ? "0".repeat(digits - binary.length) + binary : binary;
        return binary;
    }
}