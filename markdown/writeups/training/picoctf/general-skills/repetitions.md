# repetitions

Challenge description:

> Can you make sense of this file?

Alrighty, so this file is `base64` encoded, as can be told by the telltale equals signs at the end of the file.

```

┌─[slavetomints@parrot]─[~]
└──╼ $cat enc_flag 
VmpGU1EyRXlUWGxTYmxKVVYwZFNWbGxyV21GV1JteDBUbFpPYWxKdFVsaFpWVlUxWVZaS1ZWWnVh
RmRXZWtab1dWWmtSMk5yTlZWWApiVVpUVm10d1VWZFdVa2RpYlZaWFZtNVdVZ3BpU0VKeldWUkNk
MlZXVlhoWGJYQk9VbFJXU0ZkcVRuTldaM0JZVWpGS2VWWkdaSGRXCk1sWnpWV3hhVm1KRk5XOVVW
VkpEVGxaYVdFMVhSbHBWV0VKVVZGWm9RMlZzV2tWUmJFNVNDbUpXV25wWmExSmhWMGRHZEdWRlZs
aGkKYlRrelZERldUMkpzUWxWTlJYTkxDZz09Cg==
```

For this all you need to do is use the `base64` command with the `-d` flag set in order to decrypt it.

```
┌─[slavetomints@parrot]─[~/training/picoCTF/general-skills/repetitions]
└──╼ $base64 -d enc_flag 
VjFSQ2EyTXlSblJUV0dSVllrWmFWRmx0TlZOalJtUlhZVVU1YVZKVVZuaFdWekZoWVZkR2NrNVVX
bUZTVmtwUVdWUkdibVZXVm5WUgpiSEJzWVRCd2VWVXhXbXBOUlRWSFdqTnNWZ3BYUjFKeVZGZHdW
MlZzVWxaVmJFNW9UVVJDTlZaWE1XRlpVWEJUVFZoQ2VsWkVRbE5SCmJWWnpZa1JhV0dGdGVFVlhi
bTkzVDFWT2JsQlVNRXNLCg==
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbODE3NDQwMDUyLDU1ODUxMTc4M119
-->