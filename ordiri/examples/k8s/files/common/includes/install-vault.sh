
curl -sSl https://apt.releases.hashicorp.com/gpg | gpg --dearmor | tee /usr/share/keyrings/hashicorp-archive-keyring.gpg >/dev/null

if [[ -z "$(gpg --no-default-keyring --keyring /usr/share/keyrings/hashicorp-archive-keyring.gpg --fingerprint | grep "E8A0 32E0 94D8 EB4E A189  D270 DA41 8C88 A321 9F7B")" ]]; then
    echo "gpp fingerprint was not valid"
    exit 2
fi

echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com bullseye main" | tee /etc/apt/sources.list.d/hashicorp.list

apt update && apt install vault