@RestController
@RequestMapping("/users")
public class UserController {

    @GetMapping
    public ResponseEntity<ProfileDto> profile() {}

    @GetMapping("/films")
    public ResponseEntity<List<WatchedEntry>> getWatchedFilms() {}

    @GetMapping("/diary")
    public ResponseEntity<List<DiaryEntry>> getUserDiary() {}

    @PostMapping("/diary/{title}") // use principal
    public ResponseEntity<DiaryEntry> createDiaryEntry() {}

    @GetMapping("/films/reviews")
      public String getUserReview() {
        return "reviews.";
    }

    @PostMapping("/film/{title}")
      public ResponseEntity<WatchedEntry> createWatchedEntry() {}
}
