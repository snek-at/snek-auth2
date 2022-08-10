export interface Log {
    "fingerprint": string,
    "agent": string,
    "bytes": number,
    "clientIp": string,
    "extension": string,
    "geo": {
        "srcDest": string,
        "src": string,
        "dest": string,
        "coordinates": {
            "lat": number,
            "lon": number
        }
    },
    "host": string,
    "ip": string,
    "machine": {
        "ram": number,
        "os": string,
    },
    "message": string,
    "referer": string,
    "request": string,
    "response": number,
    "tags": [ string ],
    "timestamp": string,
    "url": string,
};
