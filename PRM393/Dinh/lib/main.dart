import 'package:flutter/material.dart';

void main() => runApp(const LumiereApp());

abstract final class CinemaColors {
  static const background = Color(0xFF070815);
  static const backgroundSoft = Color(0xFF0D1024);
  static const surface = Color(0xFF14172B);
  static const surfaceRaised = Color(0xFF1B1F38);
  static const primary = Color(0xFF6EE7F2);
  static const primaryMuted = Color(0xFF245E70);
  static const accent = Color(0xFFA78BFA);
  static const text = Color(0xFFF8FAFC);
  static const textMuted = Color(0xFFB7C0D4);
  static const outline = Color(0xFF343957);
  static const danger = Color(0xFFFF6B81);
}

class Film {
  const Film({
    required this.title,
    required this.internationalTitle,
    required this.director,
    required this.year,
    required this.genres,
    required this.rating,
    required this.durationMinutes,
    required this.ageRating,
    required this.country,
    required this.logline,
    required this.rank,
    required this.posterColors,
    required this.posterIcon,
  });

  final String title;
  final String internationalTitle;
  final String director;
  final int year;
  final List<String> genres;
  final double rating;
  final int durationMinutes;
  final String ageRating;
  final String country;
  final String logline;
  final int rank;
  final List<Color> posterColors;
  final IconData posterIcon;

  String get durationLabel => '$durationMinutes phút';

  String get searchableText =>
      '$title $internationalTitle $director ${genres.join(' ')}'.toLowerCase();
}

enum FilmSort {
  recommended('Đề xuất'),
  az('Tên A–Z'),
  rating('Điểm cao nhất'),
  year('Năm mới nhất');

  const FilmSort(this.label);

  final String label;
}

const filmGenres = <String>[
  'Khoa học viễn tưởng',
  'Chính kịch',
  'Hoạt hình',
  'Hành động',
  'Kỳ ảo',
  'Lãng mạn',
];

const films = <Film>[
  Film(
    title: 'Interstellar',
    internationalTitle: 'Interstellar',
    director: 'Christopher Nolan',
    year: 2014,
    genres: ['Khoa học viễn tưởng', 'Chính kịch'],
    rating: 8.7,
    durationMinutes: 169,
    ageRating: 'T13',
    country: 'Mỹ',
    logline:
        'Một hành trình xuyên không gian để tìm tương lai mới cho nhân loại.',
    rank: 1,
    posterColors: [Color(0xFF0E7490), Color(0xFF111827)],
    posterIcon: Icons.public_rounded,
  ),
  Film(
    title: 'Dune: Hành Tinh Cát - Phần Hai',
    internationalTitle: 'Dune: Part Two',
    director: 'Denis Villeneuve',
    year: 2024,
    genres: ['Khoa học viễn tưởng', 'Hành động'],
    rating: 8.5,
    durationMinutes: 166,
    ageRating: 'T13',
    country: 'Mỹ',
    logline: 'Paul Atreides bước vào cuộc chiến quyết định số phận Arrakis.',
    rank: 2,
    posterColors: [Color(0xFFB45309), Color(0xFF3F1D18)],
    posterIcon: Icons.wb_sunny_rounded,
  ),
  Film(
    title: 'Ký Sinh Trùng',
    internationalTitle: 'Parasite',
    director: 'Bong Joon-ho',
    year: 2019,
    genres: ['Chính kịch'],
    rating: 8.5,
    durationMinutes: 132,
    ageRating: 'T18',
    country: 'Hàn Quốc',
    logline:
        'Hai gia đình ở hai tầng lớp va vào nhau trong một kế hoạch khó lường.',
    rank: 3,
    posterColors: [Color(0xFF166534), Color(0xFF111827)],
    posterIcon: Icons.home_work_rounded,
  ),
  Film(
    title: 'Nhà Tù Shawshank',
    internationalTitle: 'The Shawshank Redemption',
    director: 'Frank Darabont',
    year: 1994,
    genres: ['Chính kịch'],
    rating: 9.3,
    durationMinutes: 142,
    ageRating: 'T16',
    country: 'Mỹ',
    logline: 'Hy vọng và tình bạn sống sót qua nhiều thập kỷ sau song sắt.',
    rank: 4,
    posterColors: [Color(0xFF475569), Color(0xFF172033)],
    posterIcon: Icons.light_mode_rounded,
  ),
  Film(
    title: 'Vùng Đất Linh Hồn',
    internationalTitle: 'Spirited Away',
    director: 'Hayao Miyazaki',
    year: 2001,
    genres: ['Hoạt hình', 'Kỳ ảo'],
    rating: 8.6,
    durationMinutes: 125,
    ageRating: 'P',
    country: 'Nhật Bản',
    logline:
        'Cô bé Chihiro tìm lòng can đảm trong thế giới của những linh hồn.',
    rank: 5,
    posterColors: [Color(0xFFDB2777), Color(0xFF4C1D95)],
    posterIcon: Icons.auto_awesome_rounded,
  ),
  Film(
    title: 'Spider-Man: Du Hành Vũ Trụ Nhện',
    internationalTitle: 'Spider-Man: Across the Spider-Verse',
    director: 'Joaquim Dos Santos',
    year: 2023,
    genres: ['Hoạt hình', 'Hành động'],
    rating: 8.6,
    durationMinutes: 140,
    ageRating: 'T13',
    country: 'Mỹ',
    logline: 'Miles Morales băng qua đa vũ trụ và đối mặt với lựa chọn của riêng mình.',
    rank: 6,
    posterColors: [Color(0xFF7C3AED), Color(0xFFBE123C)],
    posterIcon: Icons.hub_rounded,
  ),
  Film(
    title: 'Oppenheimer',
    internationalTitle: 'Oppenheimer',
    director: 'Christopher Nolan',
    year: 2023,
    genres: ['Chính kịch'],
    rating: 8.6,
    durationMinutes: 180,
    ageRating: 'T16',
    country: 'Mỹ',
    logline: 'Chân dung nhà vật lý đứng giữa phát minh và hệ quả lịch sử.',
    rank: 7,
    posterColors: [Color(0xFFEA580C), Color(0xFF3F1717)],
    posterIcon: Icons.blur_circular_rounded,
  ),
  Film(
    title: 'La La Land',
    internationalTitle: 'La La Land',
    director: 'Damien Chazelle',
    year: 2016,
    genres: ['Lãng mạn', 'Chính kịch'],
    rating: 8.0,
    durationMinutes: 128,
    ageRating: 'T13',
    country: 'Mỹ',
    logline: 'Tình yêu và giấc mơ gặp nhau dưới ánh đèn thành phố Los Angeles.',
    rank: 8,
    posterColors: [Color(0xFF4338CA), Color(0xFF701A75)],
    posterIcon: Icons.music_note_rounded,
  ),
];

List<Film> browseFilms({
  required Iterable<Film> source,
  required String query,
  required Set<String> genres,
  required FilmSort sort,
}) {
  final normalizedQuery = query.trim().toLowerCase();
  final result = source.where((film) {
    final matchesQuery =
        normalizedQuery.isEmpty ||
        film.searchableText.contains(normalizedQuery);
    final matchesGenre =
        genres.isEmpty || film.genres.any((genre) => genres.contains(genre));
    return matchesQuery && matchesGenre;
  }).toList();

  int byTitle(Film a, Film b) =>
      a.title.toLowerCase().compareTo(b.title.toLowerCase());

  result.sort(switch (sort) {
    FilmSort.recommended => (a, b) => a.rank.compareTo(b.rank),
    FilmSort.az => byTitle,
    FilmSort.rating => (a, b) {
      final rating = b.rating.compareTo(a.rating);
      return rating == 0 ? byTitle(a, b) : rating;
    },
    FilmSort.year => (a, b) {
      final year = b.year.compareTo(a.year);
      return year == 0 ? byTitle(a, b) : year;
    },
  });

  return result;
}

class LumiereApp extends StatelessWidget {
  const LumiereApp({super.key});

  @override
  Widget build(BuildContext context) {
    const scheme = ColorScheme.dark(
      primary: CinemaColors.primary,
      onPrimary: Color(0xFF002F35),
      secondary: CinemaColors.accent,
      onSecondary: Color(0xFF160A32),
      surface: CinemaColors.surface,
      onSurface: CinemaColors.text,
      surfaceContainerHighest: CinemaColors.surfaceRaised,
      onSurfaceVariant: CinemaColors.textMuted,
      outline: CinemaColors.outline,
      error: CinemaColors.danger,
    );

    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'LUMIÈRE — Tuyển chọn điện ảnh',
      themeMode: ThemeMode.dark,
      darkTheme: ThemeData(
        brightness: Brightness.dark,
        useMaterial3: true,
        colorScheme: scheme,
        scaffoldBackgroundColor: CinemaColors.background,
        fontFamily: 'Roboto',
        inputDecorationTheme: InputDecorationTheme(
          filled: true,
          fillColor: CinemaColors.surface,
          contentPadding: const EdgeInsets.symmetric(
            horizontal: 16,
            vertical: 16,
          ),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(16),
            borderSide: const BorderSide(color: CinemaColors.outline),
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(16),
            borderSide: const BorderSide(color: CinemaColors.outline),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(16),
            borderSide: const BorderSide(color: CinemaColors.primary, width: 2),
          ),
        ),
      ),
      home: const CinemaHomePage(),
    );
  }
}

class CinemaHomePage extends StatefulWidget {
  const CinemaHomePage({super.key});

  @override
  State<CinemaHomePage> createState() => _CinemaHomePageState();
}

class _CinemaHomePageState extends State<CinemaHomePage> {
  final _searchController = TextEditingController();
  final Set<String> _selectedGenres = {};
  String _query = '';
  FilmSort _sort = FilmSort.recommended;

  bool get _hasFilters =>
      _query.trim().isNotEmpty || _selectedGenres.isNotEmpty;

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  void _toggleGenre(String genre) {
    setState(() {
      if (!_selectedGenres.add(genre)) _selectedGenres.remove(genre);
    });
  }

  void _clearFilters() {
    _searchController.clear();
    setState(() {
      _query = '';
      _selectedGenres.clear();
    });
  }

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.sizeOf(context).width;
    final gutter = width >= 1100
        ? 40.0
        : width >= 700
        ? 24.0
        : 16.0;
    final visibleFilms = browseFilms(
      source: films,
      query: _query,
      genres: _selectedGenres,
      sort: _sort,
    );

    return Scaffold(
      body: DecoratedBox(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [CinemaColors.backgroundSoft, CinemaColors.background],
          ),
        ),
        child: SafeArea(
          child: Center(
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 1280),
              child: Padding(
                padding: EdgeInsets.fromLTRB(gutter, 12, gutter, 0),
                child: LayoutBuilder(
                  builder: (context, constraints) {
                    return Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        ConstrainedBox(
                          constraints: BoxConstraints(
                            maxHeight: constraints.maxHeight * 0.64,
                          ),
                          child: SingleChildScrollView(
                            child: _DiscoveryHeader(
                              searchController: _searchController,
                              selectedGenres: _selectedGenres,
                              sort: _sort,
                              resultCount: visibleFilms.length,
                              hasFilters: _hasFilters,
                              onSearch: (value) =>
                                  setState(() => _query = value),
                              onGenre: _toggleGenre,
                              onSort: (value) => setState(() => _sort = value),
                              onClear: _clearFilters,
                            ),
                          ),
                        ),
                        const SizedBox(height: 16),
                        Expanded(child: _FilmResults(items: visibleFilms)),
                      ],
                    );
                  },
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _DiscoveryHeader extends StatelessWidget {
  const _DiscoveryHeader({
    required this.searchController,
    required this.selectedGenres,
    required this.sort,
    required this.resultCount,
    required this.hasFilters,
    required this.onSearch,
    required this.onGenre,
    required this.onSort,
    required this.onClear,
  });

  final TextEditingController searchController;
  final Set<String> selectedGenres;
  final FilmSort sort;
  final int resultCount;
  final bool hasFilters;
  final ValueChanged<String> onSearch;
  final ValueChanged<String> onGenre;
  final ValueChanged<FilmSort> onSort;
  final VoidCallback onClear;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          key: const Key('lumiere-brand'),
          children: [
            Container(
              width: 48,
              height: 48,
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [CinemaColors.primary, CinemaColors.accent],
                ),
                borderRadius: BorderRadius.circular(15),
              ),
              child: const Icon(
                Icons.local_movies_rounded,
                color: CinemaColors.background,
                size: 26,
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'LUMIÈRE',
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: theme.textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.w900,
                      letterSpacing: 2.6,
                    ),
                  ),
                  Text(
                    'CURATED CINEMA',
                    style: theme.textTheme.labelSmall?.copyWith(
                      color: CinemaColors.primary,
                      fontWeight: FontWeight.w700,
                      letterSpacing: 1.5,
                    ),
                  ),
                ],
              ),
            ),
            const _NowShowingBadge(),
          ],
        ),
        const SizedBox(height: 20),
        _SpotlightBanner(film: films.first),
        const SizedBox(height: 24),
        Row(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Bộ sưu tập tuyển chọn',
                    style: theme.textTheme.headlineSmall?.copyWith(
                      fontWeight: FontWeight.w900,
                      letterSpacing: -0.5,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'Những câu chuyện đáng xem trên màn ảnh lớn',
                    style: theme.textTheme.bodyMedium?.copyWith(
                      color: CinemaColors.textMuted,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(width: 12),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 7),
              decoration: BoxDecoration(
                color: CinemaColors.primary.withValues(alpha: 0.12),
                borderRadius: BorderRadius.circular(999),
                border: Border.all(
                  color: CinemaColors.primary.withValues(alpha: 0.38),
                ),
              ),
              child: Text(
                '$resultCount tác phẩm',
                style: theme.textTheme.labelLarge?.copyWith(
                  color: CinemaColors.primary,
                  fontWeight: FontWeight.w800,
                ),
              ),
            ),
          ],
        ),
        const SizedBox(height: 16),
        LayoutBuilder(
          builder: (context, constraints) {
            final search = TextField(
              key: const Key('film-search'),
              controller: searchController,
              onChanged: onSearch,
              textInputAction: TextInputAction.search,
              decoration: const InputDecoration(
                labelText: 'Tìm phim hoặc đạo diễn',
                hintText: 'Ví dụ: Interstellar',
                prefixIcon: Icon(Icons.search_rounded),
              ),
            );
            final sorting = DropdownButtonFormField<FilmSort>(
              initialValue: sort,
              isExpanded: true,
              decoration: const InputDecoration(
                labelText: 'Sắp xếp',
                prefixIcon: Icon(Icons.tune_rounded),
              ),
              items: [
                for (final option in FilmSort.values)
                  DropdownMenuItem(value: option, child: Text(option.label)),
              ],
              onChanged: (value) {
                if (value != null) onSort(value);
              },
            );

            if (constraints.maxWidth >= 700) {
              return Row(
                children: [
                  Expanded(child: search),
                  const SizedBox(width: 12),
                  SizedBox(width: 230, child: sorting),
                ],
              );
            }
            return Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [search, const SizedBox(height: 12), sorting],
            );
          },
        ),
        const SizedBox(height: 16),
        LayoutBuilder(
          builder: (context, constraints) {
            final heading = Text(
              'Khám phá theo thể loại',
              style: theme.textTheme.titleSmall?.copyWith(
                fontWeight: FontWeight.w800,
              ),
            );
            final reset = AnimatedSwitcher(
              duration: const Duration(milliseconds: 160),
              child: hasFilters
                  ? TextButton.icon(
                      key: const Key('clear-filters'),
                      onPressed: onClear,
                      icon: const Icon(Icons.refresh_rounded, size: 18),
                      label: const Text('Đặt lại'),
                    )
                  : const SizedBox.shrink(),
            );

            if (constraints.maxWidth < 520) {
              return Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  heading,
                  if (hasFilters)
                    Align(alignment: Alignment.centerRight, child: reset),
                ],
              );
            }
            return Row(
              children: [
                Expanded(child: heading),
                reset,
              ],
            );
          },
        ),
        const SizedBox(height: 8),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: [
            for (final genre in filmGenres)
              ConstrainedBox(
                constraints: const BoxConstraints(minHeight: 48),
                child: FilterChip(
                  label: Text(genre),
                  selected: selectedGenres.contains(genre),
                  onSelected: (_) => onGenre(genre),
                  showCheckmark: true,
                  selectedColor: CinemaColors.primary.withValues(alpha: 0.2),
                  side: BorderSide(
                    color: selectedGenres.contains(genre)
                        ? CinemaColors.primary
                        : CinemaColors.outline,
                  ),
                ),
              ),
          ],
        ),
      ],
    );
  }
}

class _NowShowingBadge extends StatelessWidget {
  const _NowShowingBadge();

  @override
  Widget build(BuildContext context) {
    return Container(
      constraints: const BoxConstraints(minHeight: 44),
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: CinemaColors.surface,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: CinemaColors.outline),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 8,
            height: 8,
            decoration: const BoxDecoration(
              color: CinemaColors.primary,
              shape: BoxShape.circle,
            ),
          ),
          const SizedBox(width: 8),
          Text(
            '8 phim',
            style: Theme.of(context).textTheme.labelLarge
                ?.copyWith(fontWeight: FontWeight.w700),
          ),
        ],
      ),
    );
  }
}

class _SpotlightBanner extends StatelessWidget {
  const _SpotlightBanner({required this.film});

  final Film film;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final scale = MediaQuery.textScalerOf(context).scale(16) / 16;

    return Container(
      key: const Key('spotlight-banner'),
      constraints: BoxConstraints(minHeight: 180 * scale.clamp(1, 1.35)),
      clipBehavior: Clip.antiAlias,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(24),
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Color(0xFF122A46), Color(0xFF251547), Color(0xFF101326)],
        ),
        border: Border.all(color: CinemaColors.outline),
      ),
      child: Stack(
        children: [
          Positioned(
            right: -35,
            top: -50,
            child: Container(
              width: 210,
              height: 210,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: CinemaColors.primary.withValues(alpha: 0.1),
                boxShadow: [
                  BoxShadow(
                    color: CinemaColors.primary.withValues(alpha: 0.15),
                    blurRadius: 70,
                    spreadRadius: 18,
                  ),
                ],
              ),
            ),
          ),
          Positioned(
            right: 22,
            bottom: 18,
            child: Icon(
              Icons.public_rounded,
              size: 116,
              color: Colors.white.withValues(alpha: 0.08),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(22),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 10,
                    vertical: 6,
                  ),
                  decoration: BoxDecoration(
                    color: CinemaColors.primary.withValues(alpha: 0.14),
                    borderRadius: BorderRadius.circular(999),
                  ),
                  child: Text(
                    'TIÊU ĐIỂM TUẦN NÀY',
                    style: theme.textTheme.labelSmall?.copyWith(
                      color: CinemaColors.primary,
                      fontWeight: FontWeight.w900,
                      letterSpacing: 1.1,
                    ),
                  ),
                ),
                const SizedBox(height: 14),
                Text(
                  film.title,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: theme.textTheme.headlineMedium?.copyWith(
                    fontWeight: FontWeight.w900,
                    letterSpacing: -0.8,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  '${film.director}  •  ${film.year}  •  ${film.durationLabel}',
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: CinemaColors.textMuted,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 12),
                Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Icon(
                      Icons.star_rounded,
                      color: CinemaColors.primary,
                      size: 20,
                    ),
                    const SizedBox(width: 5),
                    Text(
                      '${film.rating}/10',
                      style: theme.textTheme.labelLarge?.copyWith(
                        color: CinemaColors.text,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _FilmResults extends StatelessWidget {
  const _FilmResults({required this.items});

  final List<Film> items;

  @override
  Widget build(BuildContext context) {
    if (items.isEmpty) return const _EmptyFilms();

    return LayoutBuilder(
      builder: (context, constraints) {
        final width = MediaQuery.sizeOf(context).width;
        if (width < 720) {
          return ListView.separated(
            key: const Key('film-list'),
            keyboardDismissBehavior: ScrollViewKeyboardDismissBehavior.onDrag,
            padding: const EdgeInsets.only(bottom: 16),
            itemCount: items.length,
            separatorBuilder: (_, _) => const SizedBox(height: 12),
            itemBuilder: (context, index) =>
                FilmCard(film: items[index], horizontal: true),
          );
        }

        final columns = width >= 1100 ? 3 : 2;
        final scale = MediaQuery.textScalerOf(context).scale(16) / 16;
        return GridView.builder(
          key: const Key('film-grid'),
          keyboardDismissBehavior: ScrollViewKeyboardDismissBehavior.onDrag,
          padding: const EdgeInsets.only(bottom: 20),
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: columns,
            crossAxisSpacing: 16,
            mainAxisSpacing: 16,
            mainAxisExtent: 344 * scale.clamp(1, 1.7),
          ),
          itemCount: items.length,
          itemBuilder: (context, index) =>
              FilmCard(film: items[index], horizontal: false),
        );
      },
    );
  }
}

class FilmCard extends StatelessWidget {
  const FilmCard({super.key, required this.film, required this.horizontal});

  final Film film;
  final bool horizontal;

  void _openDetails(BuildContext context) {
    showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      backgroundColor: CinemaColors.surface,
      barrierColor: Colors.black.withValues(alpha: 0.74),
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
      ),
      builder: (context) => _FilmDetailSheet(film: film),
    );
  }

  @override
  Widget build(BuildContext context) {
    final scale = MediaQuery.textScalerOf(context).scale(16) / 16;
    final height = (206 * scale.clamp(1.0, 2.0)).toDouble();

    return Semantics(
      button: true,
      label: 'Mở chi tiết ${film.title}',
      child: Card(
        key: Key('film-card-${film.title}'),
        margin: EdgeInsets.zero,
        color: CinemaColors.surface,
        clipBehavior: Clip.antiAlias,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
          side: const BorderSide(color: CinemaColors.outline),
        ),
        child: InkWell(
          onTap: () => _openDetails(context),
          child: horizontal
              ? SizedBox(
                  height: height,
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      SizedBox(width: 124, child: _FilmPoster(film: film)),
                      Expanded(child: _FilmInformation(film: film)),
                    ],
                  ),
                )
              : Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Expanded(flex: 6, child: _FilmPoster(film: film)),
                    Expanded(flex: 5, child: _FilmInformation(film: film)),
                  ],
                ),
        ),
      ),
    );
  }
}

class _FilmPoster extends StatelessWidget {
  const _FilmPoster({required this.film});

  final Film film;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return DecoratedBox(
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: film.posterColors,
        ),
      ),
      child: Stack(
        fit: StackFit.expand,
        children: [
          Positioned(
            right: -20,
            top: 12,
            child: Icon(
              film.posterIcon,
              size: 118,
              color: Colors.white.withValues(alpha: 0.12),
            ),
          ),
          const DecoratedBox(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [Colors.transparent, Color(0xD9000000)],
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(12),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'LUMIÈRE',
                  style: theme.textTheme.labelSmall?.copyWith(
                    color: Colors.white70,
                    fontWeight: FontWeight.w900,
                    letterSpacing: 1.4,
                  ),
                ),
                const Spacer(),
                Icon(film.posterIcon, color: Colors.white, size: 28),
                const SizedBox(height: 8),
                Text(
                  film.title.toUpperCase(),
                  maxLines: 3,
                  overflow: TextOverflow.ellipsis,
                  style: theme.textTheme.labelLarge?.copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.w900,
                    height: 1.08,
                  ),
                ),
                const SizedBox(height: 5),
                Text(
                  '${film.year}',
                  style: theme.textTheme.labelSmall?.copyWith(
                    color: Colors.white70,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _FilmInformation extends StatelessWidget {
  const _FilmInformation({required this.film});

  final Film film;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Padding(
      padding: const EdgeInsets.all(14),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: Text(
                  film.title,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: theme.textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w900,
                    height: 1.15,
                  ),
                ),
              ),
              const SizedBox(width: 8),
              _AgeBadge(value: film.ageRating),
            ],
          ),
          const SizedBox(height: 6),
          Text(
            film.director,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: theme.textTheme.bodySmall?.copyWith(
              color: CinemaColors.textMuted,
            ),
          ),
          const SizedBox(height: 10),
          Wrap(
            spacing: 12,
            runSpacing: 6,
            children: [
              _Meta(icon: Icons.star_rounded, text: '${film.rating}'),
              _Meta(icon: Icons.schedule_rounded, text: film.durationLabel),
              _Meta(icon: Icons.public_rounded, text: film.country),
            ],
          ),
          const SizedBox(height: 10),
          Text(
            film.genres.join('  •  '),
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
            style: theme.textTheme.labelMedium?.copyWith(
              color: CinemaColors.primary,
              fontWeight: FontWeight.w700,
            ),
          ),
        ],
      ),
    );
  }
}

class _AgeBadge extends StatelessWidget {
  const _AgeBadge({required this.value});

  final String value;

  @override
  Widget build(BuildContext context) {
    final color = switch (value) {
      'P' => const Color(0xFF22C55E),
      'T13' => const Color(0xFF38BDF8),
      'T16' => const Color(0xFFF59E0B),
      _ => CinemaColors.danger,
    };
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 4),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.16),
        borderRadius: BorderRadius.circular(7),
        border: Border.all(color: color.withValues(alpha: 0.7)),
      ),
      child: Text(
        value,
        style: Theme.of(context).textTheme.labelSmall
            ?.copyWith(color: color, fontWeight: FontWeight.w900),
      ),
    );
  }
}

class _Meta extends StatelessWidget {
  const _Meta({required this.icon, required this.text});

  final IconData icon;
  final String text;

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: 220),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 17, color: CinemaColors.textMuted),
          const SizedBox(width: 4),
          Flexible(
            child: Text(
              text,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: Theme.of(context).textTheme.labelMedium?.copyWith(
                color: CinemaColors.textMuted,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _FilmDetailSheet extends StatelessWidget {
  const _FilmDetailSheet({required this.film});

  final Film film;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return SafeArea(
      key: const Key('film-detail-sheet'),
      child: SingleChildScrollView(
        padding: const EdgeInsets.fromLTRB(24, 12, 24, 24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            Center(
              child: Container(
                width: 48,
                height: 4,
                decoration: BoxDecoration(
                  color: CinemaColors.outline,
                  borderRadius: BorderRadius.circular(999),
                ),
              ),
            ),
            const SizedBox(height: 22),
            Text(
              film.title,
              style: theme.textTheme.headlineSmall?.copyWith(
                fontWeight: FontWeight.w900,
              ),
            ),
            const SizedBox(height: 6),
            Text(
              film.internationalTitle,
              style: theme.textTheme.titleMedium?.copyWith(
                color: CinemaColors.primary,
              ),
            ),
            const SizedBox(height: 18),
            Wrap(
              spacing: 16,
              runSpacing: 10,
              children: [
                _Meta(icon: Icons.movie_creation_outlined, text: film.director),
                _Meta(icon: Icons.calendar_today_rounded, text: '${film.year}'),
                _Meta(icon: Icons.schedule_rounded, text: film.durationLabel),
                _Meta(icon: Icons.star_rounded, text: '${film.rating}/10'),
              ],
            ),
            const SizedBox(height: 20),
            Text(
              film.logline,
              style: theme.textTheme.bodyLarge?.copyWith(
                color: CinemaColors.textMuted,
                height: 1.6,
              ),
            ),
            const SizedBox(height: 24),
            SizedBox(
              width: double.infinity,
              height: 52,
              child: FilledButton.icon(
                onPressed: () => Navigator.of(context).pop(),
                icon: const Icon(Icons.close_rounded),
                label: const Text('Khép lại'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _EmptyFilms extends StatelessWidget {
  const _EmptyFilms();

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Center(
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 76,
              height: 76,
              decoration: BoxDecoration(
                color: CinemaColors.primary.withValues(alpha: 0.1),
                shape: BoxShape.circle,
                border: Border.all(
                  color: CinemaColors.primary.withValues(alpha: 0.32),
                ),
              ),
              child: const Icon(
                Icons.video_library_outlined,
                color: CinemaColors.primary,
                size: 34,
              ),
            ),
            const SizedBox(height: 16),
            Text(
              'Không tìm thấy tác phẩm',
              textAlign: TextAlign.center,
              style: theme.textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.w900,
              ),
            ),
            const SizedBox(height: 6),
            Text(
              'Hãy thử từ khóa khác hoặc đặt lại bộ lọc.',
              textAlign: TextAlign.center,
              style: theme.textTheme.bodyMedium?.copyWith(
                color: CinemaColors.textMuted,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
