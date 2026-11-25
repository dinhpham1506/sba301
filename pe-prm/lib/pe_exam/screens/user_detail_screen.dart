import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class UserDetailScreen extends ConsumerWidget {
  const UserDetailScreen({super.key, required this.userId});

  final int userId;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // TODO: doc user tu provider theo userId
    // hien thi avatar lon, name, email, nut Edit / Delete
    throw UnimplementedError();
  }
}
