import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:lumiere_movie_browser/main.dart';

void main() {
  group('browseFilms', () {
    test('searches titles and directors without changing source order', () {
      final original = films.map((film) => film.title).toList();

      final byTitle = browseFilms(
        source: films,
        query: '  interstellar  ',
        genres: const {},
        sort: FilmSort.recommended,
      );
      final byDirector = browseFilms(
        source: films,
        query: 'bong joon-ho',
        genres: const {},
        sort: FilmSort.recommended,
      );

      expect(byTitle.map((film) => film.title), ['Interstellar']);
      expect(byDirector.map((film) => film.title), ['Ký Sinh Trùng']);
      expect(films.map((film) => film.title), original);
    });

    test('matches any selected genre', () {
      final result = browseFilms(
        source: films,
        query: '',
        genres: const {'Hoạt hình', 'Khoa học viễn tưởng'},
        sort: FilmSort.az,
      );

      expect(result.map((film) => film.title), [
        'Dune: Hành Tinh Cát - Phần Hai',
        'Interstellar',
        'Spider-Man: Du Hành Vũ Trụ Nhện',
        'Vùng Đất Linh Hồn',
      ]);
    });

    test('sorts by title, rating, and release year', () {
      final byTitle = browseFilms(
        source: films,
        query: '',
        genres: const {},
        sort: FilmSort.az,
      );
      final byRating = browseFilms(
        source: films,
        query: '',
        genres: const {},
        sort: FilmSort.rating,
      );
      final byYear = browseFilms(
        source: films,
        query: '',
        genres: const {},
        sort: FilmSort.year,
      );

      expect(byTitle.first.title, 'Dune: Hành Tinh Cát - Phần Hai');
      expect(byRating.first.title, 'Nhà Tù Shawshank');
      expect(byYear.first.title, 'Dune: Hành Tinh Cát - Phần Hai');
    });
  });

  group('CinemaHomePage', () {
    testWidgets('shows a cinematic Vietnamese film collection', (tester) async {
      await pumpLumiere(tester, const Size(390, 844));

      expect(find.byKey(const Key('lumiere-brand')), findsOneWidget);
      expect(find.byKey(const Key('spotlight-banner')), findsOneWidget);
      expect(find.text('Bộ sưu tập tuyển chọn'), findsOneWidget);
      expect(find.text('8 tác phẩm'), findsOneWidget);
    });

    testWidgets('searches films and resets the result', (tester) async {
      await pumpLumiere(tester, const Size(390, 844));

      await tester.enterText(find.byKey(const Key('film-search')), 'parasite');
      await tester.pump();

      expect(find.text('Ký Sinh Trùng'), findsOneWidget);
      expect(find.text('1 tác phẩm'), findsOneWidget);

      final clearButton = find.byKey(const Key('clear-filters'));
      await tester.ensureVisible(clearButton);
      await tester.tap(clearButton);
      await tester.pump();

      expect(find.text('8 tác phẩm'), findsOneWidget);
    });

    testWidgets('filters films with accessible genre chips', (tester) async {
      await pumpLumiere(tester, const Size(390, 844));

      final animationChip = find.widgetWithText(FilterChip, 'Hoạt hình');
      await tester.ensureVisible(animationChip);
      await tester.tap(animationChip);
      await tester.pump();

      expect(find.text('2 tác phẩm'), findsOneWidget);
      final chip = tester.widget<FilterChip>(animationChip);
      expect(chip.selected, isTrue);
    });

    testWidgets('uses one, two, and three columns by viewport width', (
      tester,
    ) async {
      await pumpLumiere(tester, const Size(390, 844));
      expect(find.byKey(const Key('film-list')), findsOneWidget);

      await pumpLumiere(tester, const Size(800, 1000));
      var grid = tester.widget<GridView>(find.byKey(const Key('film-grid')));
      var delegate =
          grid.gridDelegate as SliverGridDelegateWithFixedCrossAxisCount;
      expect(delegate.crossAxisCount, 2);

      await pumpLumiere(tester, const Size(1200, 900));
      grid = tester.widget<GridView>(find.byKey(const Key('film-grid')));
      delegate = grid.gridDelegate as SliverGridDelegateWithFixedCrossAxisCount;
      expect(delegate.crossAxisCount, 3);
    });

    testWidgets('opens a film detail sheet from a card', (tester) async {
      await pumpLumiere(tester, const Size(390, 844));

      final card = find.byKey(const Key('film-card-Interstellar'));
      await tester.ensureVisible(card);
      await tester.tap(card);
      await tester.pumpAndSettle();

      expect(find.byKey(const Key('film-detail-sheet')), findsOneWidget);
      expect(find.text('Christopher Nolan'), findsWidgets);
      expect(find.text('Khép lại'), findsOneWidget);
    });

    testWidgets('shows an empty state for an unknown film', (tester) async {
      await pumpLumiere(tester, const Size(390, 844));

      await tester.enterText(
        find.byKey(const Key('film-search')),
        'không tồn tại',
      );
      await tester.pump();

      expect(find.text('Không tìm thấy tác phẩm'), findsOneWidget);
      expect(find.text('0 tác phẩm'), findsOneWidget);
    });

    testWidgets('has no overflow on a small phone and landscape', (
      tester,
    ) async {
      await pumpLumiere(tester, const Size(375, 667));
      expect(tester.takeException(), isNull);

      await pumpLumiere(tester, const Size(844, 390));
      expect(tester.takeException(), isNull);
    });

    testWidgets('supports enlarged system text', (tester) async {
      tester.platformDispatcher.textScaleFactorTestValue = 2;
      addTearDown(tester.platformDispatcher.clearTextScaleFactorTestValue);

      await pumpLumiere(tester, const Size(390, 844));

      expect(find.byKey(const Key('lumiere-brand')), findsOneWidget);
      expect(tester.takeException(), isNull);
    });
  });
}

Future<void> pumpLumiere(WidgetTester tester, Size size) async {
  tester.view.devicePixelRatio = 1;
  tester.view.physicalSize = size;
  addTearDown(tester.view.reset);
  await tester.pumpWidget(const LumiereApp());
  await tester.pump();
}
