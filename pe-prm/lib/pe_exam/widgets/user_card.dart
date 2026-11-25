import 'package:flutter/material.dart';

class UserCard extends StatelessWidget {
  const UserCard({
    super.key,
    required this.name,
    required this.email,
    required this.avatar,
    this.onTap,
    this.onDelete,
  });

  final String name;
  final String email;
  final String avatar;
  final VoidCallback? onTap;
  final VoidCallback? onDelete;

  @override
  Widget build(BuildContext context) {
    // TODO: Card chua UserAvatar + Name + Email + nut xoa
    // InkWell/ListTile: onTap -> chi tiet
    throw UnimplementedError();
  }
}
