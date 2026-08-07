# Strona na 3. rocznicę związku

Gotowy statyczny projekt strony internetowej na rocznicę `09.08.2023`.

## Jak uruchomić

Otwórz plik:

```text
index.html
```

Strona działa bez instalowania czegokolwiek.

## Kod do kłódki

Domyślny kod:

```text
09082023
```

To data rocznicy zapisana bez kropek.

## Jak podmienić zdjęcia

W folderze:

```text
assets/photos
```

znajdują się pliki:

```text
photo-1.jpg
photo-2.jpg
photo-3.svg
photo-4.svg
photo-5.svg
photo-6.svg
start-barbie.jpg
final-photo.jpg
```

Możesz je zastąpić swoimi zdjęciami. Najwygodniej:

1. Usuń dany plik, np. `photo-1.jpg`.
2. Wklej swoje zdjęcie.
3. Nazwij je dokładnie tak samo, np. `photo-1.jpg`.
4. W pliku `script.js` i `index.html` zmień końcówkę z `.svg` na `.jpg` przy tym zdjęciu.

Jeśli chcesz mniej zmieniania w kodzie, możesz też zapisać swoje zdjęcia jako `.svg` tylko wtedy, gdy wiesz jak. W praktyce prościej użyć `.jpg` albo `.png` i zmienić ścieżki.

## Zdjęcia w grze memory

Gra memory używa teraz plików:

```text
assets/photos/memory-1.jpg
assets/photos/memory-2.jpg
assets/photos/memory-3.jpg
assets/photos/memory-4.jpg
assets/photos/memory-5.jpg
assets/photos/memory-6.jpg
```

To są zdjęcia dodane do projektu i zoptymalizowane pod stronę.

## Jak dodać muzykę

W folderze:

```text
assets/music
```

wstaw plik MP3 i nazwij go:

```text
our-song.mp3
```

Jeśli go nie dodasz, przycisk muzyki nadal działa, bo strona uruchamia prostą delikatną melodię z przeglądarki.

## Jak zmienić teksty

Najważniejsze ustawienia są na początku pliku:

```text
script.js
```

W obiekcie `CONFIG` możesz zmienić:

- imię lub zwrot w `partnerName`,
- datę w `anniversaryDate`,
- kod kłódki w `unlockCode`,
- pytanie i odpowiedzi w `quizQuestion` oraz `quizAnswers`,
- elementy osi czasu w `timeline`,
- treść listu w `letter`,
- kupony w `coupons`,
- nagrody w kole fortuny w `wheelPrizes`.

## Pliki projektu

```text
index.html
style.css
script.js
assets/photos/*
assets/music/*
README.md
```
