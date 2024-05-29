const c = {
    'U': [254, 254, 254],
    'R': [137, 18, 20],
    'F': [25, 155, 76],
    'D': [254, 213, 47],
    'B': [13, 72, 172],
    'L': [255, 85, 37]
};

const m = [
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2,
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2,
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2,
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2,
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2,
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2,
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2,
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2,
    3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5,
    3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5,
    3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5,
    3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5,
    3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5,
    3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5,
    3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5,
    3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5,
    6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8,
    6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8,
    6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8,
    6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8,
    6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8,
    6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8,
    6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8,
    6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8,

    18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20,
    18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20,
    18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20,
    18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20,
    18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20,
    18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20,
    18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20,
    18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20,
    21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23,
    21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23,
    21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23,
    21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23,
    21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23,
    21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23,
    21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23,
    21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23,
    24, 24, 24, 24, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 26,
    24, 24, 24, 24, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 26,
    24, 24, 24, 24, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 26,
    24, 24, 24, 24, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 26,
    24, 24, 24, 24, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 26,
    24, 24, 24, 24, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 26,
    24, 24, 24, 24, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 26,
    24, 24, 24, 24, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 26,

    9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11,
    9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11,
    9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11,
    9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11,
    9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11,
    9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11,
    9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11,
    9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11,
    12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 14,
    12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 14,
    12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 14,
    12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 14,
    12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 14,
    12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 14,
    12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 14,
    12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 14,
    15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 17,
    15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 17,
    15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 17,
    15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 17,
    15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 17,
    15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 17,
    15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 17,
    15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 17,

    29, 29, 29, 29, 29, 29, 29, 29, 32, 32, 32, 32, 32, 32, 32, 32, 35, 35, 35, 35, 35, 35, 35, 35,
    29, 29, 29, 29, 29, 29, 29, 29, 32, 32, 32, 32, 32, 32, 32, 32, 35, 35, 35, 35, 35, 35, 35, 35,
    29, 29, 29, 29, 29, 29, 29, 29, 32, 32, 32, 32, 32, 32, 32, 32, 35, 35, 35, 35, 35, 35, 35, 35,
    29, 29, 29, 29, 29, 29, 29, 29, 32, 32, 32, 32, 32, 32, 32, 32, 35, 35, 35, 35, 35, 35, 35, 35,
    29, 29, 29, 29, 29, 29, 29, 29, 32, 32, 32, 32, 32, 32, 32, 32, 35, 35, 35, 35, 35, 35, 35, 35,
    29, 29, 29, 29, 29, 29, 29, 29, 32, 32, 32, 32, 32, 32, 32, 32, 35, 35, 35, 35, 35, 35, 35, 35,
    29, 29, 29, 29, 29, 29, 29, 29, 32, 32, 32, 32, 32, 32, 32, 32, 35, 35, 35, 35, 35, 35, 35, 35,
    29, 29, 29, 29, 29, 29, 29, 29, 32, 32, 32, 32, 32, 32, 32, 32, 35, 35, 35, 35, 35, 35, 35, 35,
    28, 28, 28, 28, 28, 28, 28, 28, 31, 31, 31, 31, 31, 31, 31, 31, 34, 34, 34, 34, 34, 34, 34, 34,
    28, 28, 28, 28, 28, 28, 28, 28, 31, 31, 31, 31, 31, 31, 31, 31, 34, 34, 34, 34, 34, 34, 34, 34,
    28, 28, 28, 28, 28, 28, 28, 28, 31, 31, 31, 31, 31, 31, 31, 31, 34, 34, 34, 34, 34, 34, 34, 34,
    28, 28, 28, 28, 28, 28, 28, 28, 31, 31, 31, 31, 31, 31, 31, 31, 34, 34, 34, 34, 34, 34, 34, 34,
    28, 28, 28, 28, 28, 28, 28, 28, 31, 31, 31, 31, 31, 31, 31, 31, 34, 34, 34, 34, 34, 34, 34, 34,
    28, 28, 28, 28, 28, 28, 28, 28, 31, 31, 31, 31, 31, 31, 31, 31, 34, 34, 34, 34, 34, 34, 34, 34,
    28, 28, 28, 28, 28, 28, 28, 28, 31, 31, 31, 31, 31, 31, 31, 31, 34, 34, 34, 34, 34, 34, 34, 34,
    28, 28, 28, 28, 28, 28, 28, 28, 31, 31, 31, 31, 31, 31, 31, 31, 34, 34, 34, 34, 34, 34, 34, 34,
    27, 27, 27, 27, 27, 27, 27, 27, 30, 30, 30, 30, 30, 30, 30, 30, 33, 33, 33, 33, 33, 33, 33, 33,
    27, 27, 27, 27, 27, 27, 27, 27, 30, 30, 30, 30, 30, 30, 30, 30, 33, 33, 33, 33, 33, 33, 33, 33,
    27, 27, 27, 27, 27, 27, 27, 27, 30, 30, 30, 30, 30, 30, 30, 30, 33, 33, 33, 33, 33, 33, 33, 33,
    27, 27, 27, 27, 27, 27, 27, 27, 30, 30, 30, 30, 30, 30, 30, 30, 33, 33, 33, 33, 33, 33, 33, 33,
    27, 27, 27, 27, 27, 27, 27, 27, 30, 30, 30, 30, 30, 30, 30, 30, 33, 33, 33, 33, 33, 33, 33, 33,
    27, 27, 27, 27, 27, 27, 27, 27, 30, 30, 30, 30, 30, 30, 30, 30, 33, 33, 33, 33, 33, 33, 33, 33,
    27, 27, 27, 27, 27, 27, 27, 27, 30, 30, 30, 30, 30, 30, 30, 30, 33, 33, 33, 33, 33, 33, 33, 33,
    27, 27, 27, 27, 27, 27, 27, 27, 30, 30, 30, 30, 30, 30, 30, 30, 33, 33, 33, 33, 33, 33, 33, 33,

    51, 51, 51, 51, 51, 51, 51, 51, 48, 48, 48, 48, 48, 48, 48, 48, 45, 45, 45, 45, 45, 45, 45, 45,
    51, 51, 51, 51, 51, 51, 51, 51, 48, 48, 48, 48, 48, 48, 48, 48, 45, 45, 45, 45, 45, 45, 45, 45,
    51, 51, 51, 51, 51, 51, 51, 51, 48, 48, 48, 48, 48, 48, 48, 48, 45, 45, 45, 45, 45, 45, 45, 45,
    51, 51, 51, 51, 51, 51, 51, 51, 48, 48, 48, 48, 48, 48, 48, 48, 45, 45, 45, 45, 45, 45, 45, 45,
    51, 51, 51, 51, 51, 51, 51, 51, 48, 48, 48, 48, 48, 48, 48, 48, 45, 45, 45, 45, 45, 45, 45, 45,
    51, 51, 51, 51, 51, 51, 51, 51, 48, 48, 48, 48, 48, 48, 48, 48, 45, 45, 45, 45, 45, 45, 45, 45,
    51, 51, 51, 51, 51, 51, 51, 51, 48, 48, 48, 48, 48, 48, 48, 48, 45, 45, 45, 45, 45, 45, 45, 45,
    51, 51, 51, 51, 51, 51, 51, 51, 48, 48, 48, 48, 48, 48, 48, 48, 45, 45, 45, 45, 45, 45, 45, 45,
    52, 52, 52, 52, 52, 52, 52, 52, 49, 49, 49, 49, 49, 49, 49, 49, 46, 46, 46, 46, 46, 46, 46, 46,
    52, 52, 52, 52, 52, 52, 52, 52, 49, 49, 49, 49, 49, 49, 49, 49, 46, 46, 46, 46, 46, 46, 46, 46,
    52, 52, 52, 52, 52, 52, 52, 52, 49, 49, 49, 49, 49, 49, 49, 49, 46, 46, 46, 46, 46, 46, 46, 46,
    52, 52, 52, 52, 52, 52, 52, 52, 49, 49, 49, 49, 49, 49, 49, 49, 46, 46, 46, 46, 46, 46, 46, 46,
    52, 52, 52, 52, 52, 52, 52, 52, 49, 49, 49, 49, 49, 49, 49, 49, 46, 46, 46, 46, 46, 46, 46, 46,
    52, 52, 52, 52, 52, 52, 52, 52, 49, 49, 49, 49, 49, 49, 49, 49, 46, 46, 46, 46, 46, 46, 46, 46,
    52, 52, 52, 52, 52, 52, 52, 52, 49, 49, 49, 49, 49, 49, 49, 49, 46, 46, 46, 46, 46, 46, 46, 46,
    52, 52, 52, 52, 52, 52, 52, 52, 49, 49, 49, 49, 49, 49, 49, 49, 46, 46, 46, 46, 46, 46, 46, 46,
    53, 53, 53, 53, 53, 53, 53, 53, 50, 50, 50, 50, 50, 50, 50, 50, 47, 47, 47, 47, 47, 47, 47, 47,
    53, 53, 53, 53, 53, 53, 53, 53, 50, 50, 50, 50, 50, 50, 50, 50, 47, 47, 47, 47, 47, 47, 47, 47,
    53, 53, 53, 53, 53, 53, 53, 53, 50, 50, 50, 50, 50, 50, 50, 50, 47, 47, 47, 47, 47, 47, 47, 47,
    53, 53, 53, 53, 53, 53, 53, 53, 50, 50, 50, 50, 50, 50, 50, 50, 47, 47, 47, 47, 47, 47, 47, 47,
    53, 53, 53, 53, 53, 53, 53, 53, 50, 50, 50, 50, 50, 50, 50, 50, 47, 47, 47, 47, 47, 47, 47, 47,
    53, 53, 53, 53, 53, 53, 53, 53, 50, 50, 50, 50, 50, 50, 50, 50, 47, 47, 47, 47, 47, 47, 47, 47,
    53, 53, 53, 53, 53, 53, 53, 53, 50, 50, 50, 50, 50, 50, 50, 50, 47, 47, 47, 47, 47, 47, 47, 47,
    53, 53, 53, 53, 53, 53, 53, 53, 50, 50, 50, 50, 50, 50, 50, 50, 47, 47, 47, 47, 47, 47, 47, 47,

    42, 42, 42, 42, 42, 42, 42, 42, 39, 39, 39, 39, 39, 39, 39, 39, 36, 36, 36, 36, 36, 36, 36, 36,
    42, 42, 42, 42, 42, 42, 42, 42, 39, 39, 39, 39, 39, 39, 39, 39, 36, 36, 36, 36, 36, 36, 36, 36,
    42, 42, 42, 42, 42, 42, 42, 42, 39, 39, 39, 39, 39, 39, 39, 39, 36, 36, 36, 36, 36, 36, 36, 36,
    42, 42, 42, 42, 42, 42, 42, 42, 39, 39, 39, 39, 39, 39, 39, 39, 36, 36, 36, 36, 36, 36, 36, 36,
    42, 42, 42, 42, 42, 42, 42, 42, 39, 39, 39, 39, 39, 39, 39, 39, 36, 36, 36, 36, 36, 36, 36, 36,
    42, 42, 42, 42, 42, 42, 42, 42, 39, 39, 39, 39, 39, 39, 39, 39, 36, 36, 36, 36, 36, 36, 36, 36,
    42, 42, 42, 42, 42, 42, 42, 42, 39, 39, 39, 39, 39, 39, 39, 39, 36, 36, 36, 36, 36, 36, 36, 36,
    42, 42, 42, 42, 42, 42, 42, 42, 39, 39, 39, 39, 39, 39, 39, 39, 36, 36, 36, 36, 36, 36, 36, 36,
    43, 43, 43, 43, 43, 43, 43, 43, 40, 40, 40, 40, 40, 40, 40, 40, 37, 37, 37, 37, 37, 37, 37, 37,
    43, 43, 43, 43, 43, 43, 43, 43, 40, 40, 40, 40, 40, 40, 40, 40, 37, 37, 37, 37, 37, 37, 37, 37,
    43, 43, 43, 43, 43, 43, 43, 43, 40, 40, 40, 40, 40, 40, 40, 40, 37, 37, 37, 37, 37, 37, 37, 37,
    43, 43, 43, 43, 43, 43, 43, 43, 40, 40, 40, 40, 40, 40, 40, 40, 37, 37, 37, 37, 37, 37, 37, 37,
    43, 43, 43, 43, 43, 43, 43, 43, 40, 40, 40, 40, 40, 40, 40, 40, 37, 37, 37, 37, 37, 37, 37, 37,
    43, 43, 43, 43, 43, 43, 43, 43, 40, 40, 40, 40, 40, 40, 40, 40, 37, 37, 37, 37, 37, 37, 37, 37,
    43, 43, 43, 43, 43, 43, 43, 43, 40, 40, 40, 40, 40, 40, 40, 40, 37, 37, 37, 37, 37, 37, 37, 37,
    43, 43, 43, 43, 43, 43, 43, 43, 40, 40, 40, 40, 40, 40, 40, 40, 37, 37, 37, 37, 37, 37, 37, 37,
    44, 44, 44, 44, 44, 44, 44, 44, 41, 41, 41, 41, 41, 41, 41, 41, 38, 38, 38, 38, 38, 38, 38, 38,
    44, 44, 44, 44, 44, 44, 44, 44, 41, 41, 41, 41, 41, 41, 41, 41, 38, 38, 38, 38, 38, 38, 38, 38,
    44, 44, 44, 44, 44, 44, 44, 44, 41, 41, 41, 41, 41, 41, 41, 41, 38, 38, 38, 38, 38, 38, 38, 38,
    44, 44, 44, 44, 44, 44, 44, 44, 41, 41, 41, 41, 41, 41, 41, 41, 38, 38, 38, 38, 38, 38, 38, 38,
    44, 44, 44, 44, 44, 44, 44, 44, 41, 41, 41, 41, 41, 41, 41, 41, 38, 38, 38, 38, 38, 38, 38, 38,
    44, 44, 44, 44, 44, 44, 44, 44, 41, 41, 41, 41, 41, 41, 41, 41, 38, 38, 38, 38, 38, 38, 38, 38,
    44, 44, 44, 44, 44, 44, 44, 44, 41, 41, 41, 41, 41, 41, 41, 41, 38, 38, 38, 38, 38, 38, 38, 38,
    44, 44, 44, 44, 44, 44, 44, 44, 41, 41, 41, 41, 41, 41, 41, 41, 38, 38, 38, 38, 38, 38, 38, 38,

];

let connected = false;

(async function () {
    await API.connectAsync();
    API.changeApplication("raw");
    connected = true;
    setInterval(() => API.sendHeartbeat(), 1000);
    document.getElementById('reset').click();
}());

function mapCubeToAPI(data) {
    let mappedData = new Array(m.length);
    for (let i = 0; i < m.length; i++) {
        mappedData[i] = c[data[m[i]]];
    }
    return mappedData;
}

window.updateCube = function (data) {
    if (connected) API.send(mapCubeToAPI(data));
}
