for(@ARGV) {
  chomp $_;
  print "/* $_ */\n".`cat $_`."\n"
}
