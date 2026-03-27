from __future__ import annotations

import math
import re
from hashlib import blake2b


TOKEN_PATTERN = re.compile(r"[A-Za-z0-9]+|[\u4e00-\u9fff]")


def tokenize(value: str) -> list[str]:
    return TOKEN_PATTERN.findall((value or "").lower())


def normalize_vector(vector: list[float]) -> list[float]:
    norm = math.sqrt(sum(item * item for item in vector))
    if not norm:
        return vector
    return [round(item / norm, 6) for item in vector]


def local_hash_embedding(value: str, dimensions: int) -> list[float]:
    vector = [0.0] * dimensions
    tokens = tokenize(value)
    if not tokens:
        return vector

    for token in tokens:
        digest = blake2b(token.encode("utf-8"), digest_size=16).digest()
        index = int.from_bytes(digest[:8], "big") % dimensions
        sign = 1.0 if digest[8] % 2 == 0 else -1.0
        weight = 1.0 + min(len(token), 12) / 12
        vector[index] += sign * weight

    return normalize_vector(vector)
