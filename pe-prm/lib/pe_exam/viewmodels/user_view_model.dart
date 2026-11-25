import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../models/app_user.dart';
import '../repositories/user_repository.dart';

final userViewModelProvider =
    AsyncNotifierProvider<UserViewModel, List<AppUser>>(UserViewModel.new);

class UserViewModel extends AsyncNotifier<List<AppUser>> {
  UserRepository get _repository => ref.read(userRepositoryProvider);

  @override
  Future<List<AppUser>> build() {
    // TODO: load danh sach user tu repository
    throw UnimplementedError();
  }

  Future<void> addUser(AppUser user) async {
    // TODO: insert -> reload danh sach
    throw UnimplementedError();
  }

  Future<void> updateUser(AppUser user) async {
    // TODO: update -> reload danh sach
    throw UnimplementedError();
  }

  Future<void> deleteUser(int id) async {
    // TODO: delete -> reload danh sach
    throw UnimplementedError();
  }

  Future<void> refresh() async {
    // TODO: gan state = AsyncLoading roi load lai
    throw UnimplementedError();
  }
}
