import 'package:flutter/material.dart';

class UserAvatar extends StatelessWidget {
  const UserAvatar({
    super.key,
    required this.avatar,
    this.size = 56,
  });

  final String avatar;
  final double size;

  @override
  Widget build(BuildContext context) {
    // TODO: ClipOval + Image.asset('assets/avatars/$avatar')
    throw UnimplementedError();
  }
}
