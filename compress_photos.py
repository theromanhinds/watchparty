from PIL import Image
import os


FOLDER = "public/venue-photos"


def main() -> None:
    for fname in os.listdir(FOLDER):
        if not fname.lower().endswith((".jpg", ".jpeg")):
            continue

        src = os.path.join(FOLDER, fname)
        dst = os.path.join(FOLDER, os.path.splitext(fname)[0] + ".webp")

        with Image.open(src) as img:
            img.save(dst, "WEBP", quality=82, optimize=True)

        old_size = os.path.getsize(src)
        new_size = os.path.getsize(dst)
        print(f"{fname}: {old_size // 1024}KB -> {new_size // 1024}KB")


if __name__ == "__main__":
    main()
