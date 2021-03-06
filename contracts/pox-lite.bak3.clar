(define-fungible-token boost)

(define-data-var last-height uint block-height)
(define-data-var last-high uint block-height)

(define-map deposits { block-height: uint } (list 100 { address: principal, amount: uint, low: uint, high: uint, memo: (buff 70)}))

(define-read-only (get-deposit-last-high-by-height (height uint))
  (let ((d (unwrap! (map-get? deposits {block-height: height }) (err u100))))
    (ok (unwrap! (get high (element-at d (- u1 (len d)))) (err u10)))))

(define-public (append-deposit (amount uint) (memo (buff 70)) (height uint))
  (match (get-deposits-by-height height)
      deps (if (map-set deposits { block-height: height}
                 (unwrap! (as-max-len? (append deps { address: tx-sender, amount: amount, low: (unwrap! (get-deposit-last-high-by-height height) (err u838)), high: (+ u1 (unwrap! (get-deposit-last-high-by-height height) (err u838))), memo: memo }) u100)
                   (err u2)))
                 (ok true)
                 (err u3))
      error (err error)))

(define-read-only (get-deposits-by-height (height uint))
  (let ((deposits-at-height (unwrap! (map-get? deposits {block-height: height }) (err u4))))
    (ok deposits-at-height)))

(define-public (deposit (amount uint) (memo (buff 70)))
  (begin
    (match (mint (var-get last-height))
      check-height (if (> block-height (var-get last-height))
        (ok true)
        (ok false))
      error (err error))

    (match (stx-transfer? amount tx-sender (as-contract tx-sender))
      deps (if (map-insert deposits { block-height: block-height } (list { address: tx-sender, amount: amount, low: u1, high: amount, memo: memo }))
        (ok true)
        (append-deposit amount memo height))
      error (err error))))

(define-read-only (get-deposit-address-by-height-and-index (height uint) (index uint))
  (let ((d (map-get? deposits {block-height: height })))
    (ok (unwrap! (get address (element-at d index)) (err u6)))))

(define-read-only (randomize (seed uint) (max uint))
  (mod (+ u1013904223 (* u1664525 seed)) max))

(define-private (select-winning-address (entry { address: (optional principal), amount: uint, low: uint, high: uint, memo: (buff 70)})
  (context {random-value: uint, result: (optional principal)}))

(let ((random-value (get random-value context)) (result (get result context)))
(if (is-some result) 
  ;; we have already a winner
  context
  ;; else check if the current deposit wins
  (if (and (> random-value (get low entry)) (< random-value (get high entry)))
      ;; won!!
      {random-value: random-value, result: (get address entry)}
      context)))
)

(define-private (mint (height uint))
  (begin
  (var-set last-height height)
  (fold select-winning-address (unwrap! (get-deposits-by-height height) (err u09324)) {random-value: (randomize block-height (unwrap! (get-deposit-last-high-by-height height) (err u838))), result: none})
  ))

(define-private (mint-boost (address principal))
  (ft-mint? boost u1 address)
)