lower_alpha = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz"
upper_alpha = lower_alpha.upper()
alpha_size = len(lower_alpha) / 2

print("Enter the message")
encrypted = str(input(">"))
decrypted = ""
print("Enter the displacement")
displacement = int(input(">"))
displacement = int(displacement % alpha_size)
print(displacement)

for i in range(0, len(encrypted)):
    if encrypted[i] in lower_alpha:
        decrypted += lower_alpha[lower_alpha.find(encrypted[i]) + displacement]
    elif encrypted[i] in upper_alpha:
        decrypted += upper_alpha[upper_alpha.find(encrypted[i]) + displacement]
    else:
        decrypted += encrypted[i]

print(decrypted)
