from __future__ import annotations

from app.services.embedding_local import local_hash_embedding, normalize_vector, tokenize


def test_tokenize_supports_mixed_english_chinese_and_numbers() -> None:
    assert tokenize("Noodle 米饭 123") == ["noodle", "米", "饭", "123"]


def test_normalize_vector_preserves_zero_vector() -> None:
    assert normalize_vector([0.0, 0.0, 0.0]) == [0.0, 0.0, 0.0]


def test_local_hash_embedding_is_stable_and_normalized() -> None:
    first = local_hash_embedding("good noodles and rice", 16)
    second = local_hash_embedding("good noodles and rice", 16)

    assert first == second
    assert len(first) == 16
    assert any(value != 0 for value in first)
    assert round(sum(value * value for value in first), 6) == 1.0
