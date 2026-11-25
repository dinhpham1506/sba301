import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';

import '../models/app_user.dart';

final userRepositoryProvider = Provider<UserRepository>((ref) {
  return UserRepository();
});

class UserRepository {
  static const String _table = 'users';

  Database? _database;

  Future<Database> get database async {
    if (_database != null) return _database!;
    // TODO: mo database (getDatabasesPath + join), tao bang users neu chua co
    // Cot: id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, avatar TEXT
    throw UnimplementedError();
  }

  Future<List<AppUser>> getAllUsers() async {
    // TODO: query bang users, sap xep theo id, map sang AppUser
    throw UnimplementedError();
  }

  Future<AppUser?> getUserById(int id) async {
    // TODO: query 1 dong theo id
    throw UnimplementedError();
  }

  Future<int> insertUser(AppUser user) async {
    // TODO: insert va tra ve id moi
    throw UnimplementedError();
  }

  Future<int> updateUser(AppUser user) async {
    // TODO: update theo id, tra ve so dong bi anh huong
    throw UnimplementedError();
  }

  Future<int> deleteUser(int id) async {
    // TODO: delete theo id
    throw UnimplementedError();
  }
}
