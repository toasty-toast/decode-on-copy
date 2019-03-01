# Decode On Copy

Decode On Copy tries to base64 decode any text that you copy, and if it can be decoded to a valid URL, the URL will be copied to your clipboard instead. It is best demonstrated by example.

* The simplest case is where you copy something that is not an encoded URL, like `http://www.example.com`. Since the text you copied can't be decoded to a valid URL, you will end up with `http://www.example.com` on your clipboard.
* Now, if you copy `aHR0cDovL3d3dy5leGFtcGxlLmNvbQ==`, Decode On Copy will notice that it can be base64 decoded to `http://www.example.com` and will copy `http://www.example.com` to your clipboard instead of `aHR0cDovL3d3dy5leGFtcGxlLmNvbQ==`.
* Decode On Copy can also detect URLs that have been base64 encoded multiple times. So copying `YUhSMGNEb3ZMM2QzZHk1bGVHRnRjR3hsTG1OdmJRPT0=` would also result in `http://www.example.com` being copied to your clipboard.

## License

MIT License.