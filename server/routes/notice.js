const express = require("express");

const {
  getNotices,
  getNotice,
  createNotice,
  updateNotice,
  deleteNotice,
  noticePhotoUpload,
} = require("../controller/notice");

const router = new express.Router();
router.route("/").get(getNotices).post(createNotice);

router.route("/:id").get(getNotice).put(updateNotice).delete(deleteNotice);

router.route("/:id/photo").put(noticePhotoUpload);

module.exports = router;
