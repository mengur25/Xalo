import { LearningType } from "@/types";

export interface LearnerProfile {
    name: LearningType;
    code: string; // e.g., HHH
    description: string;
    image: string;
    ingredients: {
        knowledge: string;
        skills: string;
        behavior: string;
    };
    sideEffects: string;
    prescription: string;
}

export const learnerProfiles: Record<LearningType, LearnerProfile> = {
    'Multi-vitamins': {
        name: 'Multi-vitamins',
        code: 'HHH',
        description: 'Bạn là mẫu người học toàn diện, sở hữu nền tảng kiến thức vững chắc (Knowledge), kỹ năng làm bài thi xuất sắc (Skills) và thái độ học tập tích cực (Behavior). Giống như vitamin tổng hợp, bạn có đủ mọi yếu tố cần thiết để đạt kết quả cao.',
        image: 'Multi-vitamins.png',
        ingredients: {
            knowledge:
                'Bạn sở hữu nền tảng kiến thức rộng và sâu, được tích lũy qua quá trình học tập bền bỉ. Kiến thức ngữ pháp, từ vựng và cấu trúc câu đều ở mức thành thạo. Bạn dễ dàng tiếp cận các đề khó và hiểu bản chất vấn đề nhanh chóng. Khả năng ghi nhớ và vận dụng cũng rất hiệu quả.',
            skills:
                'Bạn có kỹ năng làm bài thi thành thạo với chiến lược thông minh và linh hoạt. Các dạng bài quen thuộc đều được xử lý gọn gàng, còn dạng khó cũng ít khi làm khó được bạn. Bạn quản lý thời gian tốt, luôn biết cách phân bổ hợp lý để tối ưu điểm số. Nhờ vậy, kết quả thi của bạn thường rất ổn định.',
            behavior:
                'Bạn giữ được thói quen học tập kỷ luật và đều đặn, luôn biết mình cần làm gì để đạt mục tiêu. Bạn chủ động tìm kiếm tài liệu, luyện tập thêm khi cần và không dễ bị xao nhãng. Sự kiên trì và tinh thần cầu tiến giúp bạn luôn duy trì phong độ học tập cao. Đây chính là “điểm mạnh vàng” của bạn.'
        },
        sideEffects:
            'Bạn đôi khi gặp áp lực phải giữ phong độ hoặc kỳ vọng quá cao vào bản thân. Sự cầu toàn khiến bạn dễ bị căng thẳng khi một bài làm không như ý. Ngoài ra, tự tin quá mức đôi lúc cũng làm bạn chủ quan với những kiến thức tưởng chừng đơn giản. Điều này có thể khiến bạn mắc lỗi đáng tiếc.',
        prescription:
            'Hãy tiếp tục duy trì thói quen tốt nhưng đừng quên cân bằng giữa học tập và nghỉ ngơi. Thử thách bản thân với các dạng đề mới để tránh cảm giác “dậm chân tại chỗ”. Khi học, hãy giữ tâm lý nhẹ nhàng thay vì quá áp lực vào kết quả. Bền vững và thoải mái sẽ là chìa khóa để bạn tiến xa hơn.'

    },
    'Gummy Bear': {
        name: 'Gummy Bear',
        code: 'LLL',
        description: 'Bạn học tập với tâm thế vui vẻ, thoải mái nhưng đang thiếu cả kiến thức nền tảng, kỹ năng làm bài lẫn kỷ luật học tập. Giống như kẹo dẻo, bạn ngọt ngào, dễ thương nhưng chưa đủ "chất" để đối mặt với kỳ thi cam go.',
        image: 'Gummy Bear.png',
        
        ingredients: {
            knowledge:
                'Bạn còn nhiều lỗ hổng về kiến thức nền như từ vựng và ngữ pháp cơ bản. Sự thiếu hụt này khiến bạn khó hiểu sâu khi tiếp cận các dạng bài mới. Việc ghi nhớ đôi lúc phụ thuộc vào cảm hứng nên không ổn định. Điều này làm bạn dễ quên hoặc nhầm lẫn khi làm bài thi.',
            skills:
                'Bạn chưa nắm chắc các dạng bài nên thường lúng túng khi gặp câu hỏi khó hoặc bẫy đề. Các kỹ thuật làm bài thi bạn biết còn ở mức rời rạc, thiếu tính hệ thống. Việc quản lý thời gian cũng chưa hiệu quả, đôi khi bạn dành quá nhiều thời gian cho một câu. Điều này làm giảm đáng kể cơ hội đạt điểm cao.',
            behavior:
                'Bạn học theo cảm xúc, lúc thì rất quyết tâm, lúc lại buông lỏng hoàn toàn. Việc thiếu kế hoạch học tập cụ thể khiến tiến độ của bạn không ổn định. Khi gặp khó, bạn dễ bỏ cuộc hoặc trì hoãn. Điều này khiến bạn dù học “nhiều” nhưng lại không tiến bộ bao nhiêu.'
        },
        sideEffects:
            'Bạn dễ cảm thấy nản khi gặp bài khó hoặc đề thi dài. Kết quả thi phụ thuộc nhiều vào tâm trạng nên dễ lên xuống thất thường. Tình trạng “học nhưng không vào” có thể khiến bạn nghi ngờ năng lực bản thân. Điều này tạo ra vòng xoáy tiêu cực nếu không được điều chỉnh kịp thời.',
        prescription:
            'Bạn nên bắt đầu bằng việc xây lại nền tảng từ từ vựng và ngữ pháp căn bản. Hãy chia mục tiêu lớn thành các mục tiêu nhỏ để dễ hoàn thành hơn. Tạo một lịch học cố định giúp bạn duy trì thói quen ổn định và bền vững hơn. Ngoài ra, hãy tìm người hướng dẫn để theo sát và giúp bạn đi đúng hướng.'
    },
    'Caffeine Tablet': {
        name: 'Caffeine Tablet',
        code: 'HLH',
        description: 'Bạn có kiến thức tốt và động lực cao, nhưng kỹ năng làm bài thi (Skills) lại là điểm yếu. Giống như viên caffeine, bạn có năng lượng và thực lực nhưng dễ bị "bồn chồn", mất điểm oan vì thiếu chiến thuật.',
        image: 'Caffeine Tablet.png',
        
        ingredients: {
            knowledge:
                'Bạn sở hữu vốn kiến thức tương đối chắc chắn, đặc biệt là ngữ pháp và từ vựng thông dụng. Bạn hiểu bài khá nhanh và ít khi gặp khó trong việc tiếp nhận kiến thức mới. Tuy nhiên, đôi lúc bạn thiếu hệ thống hóa khiến kiến thức chưa thật sự sắc bén. Nhưng tổng thể, nền tảng của bạn là rất tốt.',
            skills:
                'Dù có kiến thức, bạn lại gặp khó khăn trong việc chuyển hóa thành điểm số. Bạn hay bị “đứng hình” trước các dạng bài áp lực thời gian. Kỹ năng đọc nhanh, suy luận hoặc tránh bẫy đề vẫn chưa thật sự hoàn thiện. Đây là rào cản chính khiến điểm thi chưa phản ánh đúng năng lực thật.',
            behavior:
                'Bạn có tinh thần học tập mạnh mẽ và luôn sẵn sàng cố gắng thêm. Bạn không ngại thử thách và thường đặt mục tiêu khá cao cho bản thân. Tuy nhiên, đôi lúc áp lực này khiến bạn dễ bị căng thẳng. Dù vậy, sự quyết tâm của bạn là lợi thế lớn giúp bạn tiến bộ rất nhanh.'
        },
        sideEffects:
            'Bạn dễ cảm thấy ức chế hoặc thất vọng khi điểm thi thấp hơn kỳ vọng. Trong phòng thi, bạn có thể bị hồi hộp, mất tập trung hoặc thiếu bình tĩnh. Điều này khiến bạn mắc những lỗi đơn giản dù kiến thức rất tốt. Cảm giác “học nhiều nhưng điểm thấp” có thể làm bạn mất tự tin.',
        prescription:
            'Bạn nên ưu tiên rèn kỹ năng làm bài bằng cách luyện đề theo từng dạng. Tập quản lý thời gian và rèn phản xạ nhanh để giảm áp lực khi thi. Hãy kết hợp luyện thi với các chiến thuật thông minh như loại trừ, đọc lướt, phân tích bẫy. Khi kỹ năng ổn định, điểm số của bạn sẽ tăng mạnh tương ứng với năng lực thật.'
    },
    'Vitamin C': {
        name: 'Vitamin C',
        code: 'LHH',
        description: 'Bạn có kỹ năng làm bài tốt và thái độ học tập tuyệt vời, nhưng nền tảng kiến thức (Knowledge) lại chưa vững. Giống như Vitamin C, bạn tăng đề kháng (kỹ năng/thái độ) tốt nhưng cần nạp thêm chất (kiến thức) để khỏe mạnh thực sự.',
        image: 'Vitamin C.png',
        ingredients: {
            knowledge:
                'Nền tảng kiến thức của bạn chưa thật sự vững, nhất là ở từ vựng học thuật và cấu trúc phức tạp. Khi gặp đề yêu cầu phân tích sâu, bạn dễ bị “đuối”. Bạn hiểu cách làm bài nhưng đôi khi không hiểu rõ lý do phía sau. Đây là điểm cốt lõi cần cải thiện.',
            skills:
                'Bạn nắm bắt kỹ thuật làm bài rất nhanh và thực hành khá hiệu quả. Bạn biết cách phân bổ thời gian, nhận diện dạng bài và tránh bẫy. Các bài thi mang tính chiến thuật là ưu thế mạnh của bạn. Điều này giúp bạn có điểm khá tốt ở những phần dựa nhiều vào kỹ năng.',
            behavior:
                'Bạn có thái độ học tập tốt, luôn nỗ lực, nghiêm túc và không dễ bỏ cuộc. Khi gặp khó, bạn biết cách tự điều chỉnh và tìm hướng giải quyết. Bạn học đều và duy trì thói quen khá ổn định. Đây là động lực giúp bạn giữ hiệu quả học tập trong thời gian dài.'
        },
        sideEffects:
            'Vì kiến thức nền chưa đủ mạnh, bạn dễ bị rối khi gặp dạng đề lạ. Điểm thi có thể không ổn định ở phần trọng tâm kiến thức. Bạn đôi lúc cảm thấy mình “biết làm” nhưng lại không hiểu bản chất. Điều này có thể khiến bạn mất điểm đáng tiếc nếu không khắc phục.',
        prescription:
            'Bạn cần ưu tiên củng cố nền tảng kiến thức thông qua việc học sâu – học chắc. Hãy hệ thống hóa lại ngữ pháp, mở rộng từ vựng theo chủ đề và luyện tập có phương pháp. Khi kiến thức nền mạnh lên, kỹ năng của bạn sẽ càng phát huy hiệu quả. Kết hợp giữa học kiến thức và luyện mẹo sẽ giúp bạn tiến xa hơn.'
    },
    'Cough Syrup': {
        name: 'Cough Syrup',
        code: 'HHL',
        description: 'Bạn có kiến thức và kỹ năng tốt, nhưng thiếu động lực/thói quen học tập tích cực (Hành vi học tập yếu).',
        image: 'Cough Syrup.png',
        
        ingredients: {
            knowledge:
                'Bạn có kiến thức khá chắc chắn và hiếm khi gặp khó với bài tập. Các mảng ngữ pháp và từ vựng cơ bản đều ở mức ổn định. Tuy nhiên, đôi lúc bạn thiếu sự mở rộng kiến thức nâng cao. Điều này khiến bạn chưa tối ưu hóa được tiềm năng.',
            skills:
                'Bạn có kỹ năng xử lý đề thi nhanh và tương đối chính xác. Bạn hiểu rõ dạng bài và biết cách tránh bẫy hiệu quả. Tuy nhiên, kỹ năng này chưa được phát huy hết vì thiếu sự duy trì trong thực hành. Bạn giỏi nhưng chưa bứt phá.',
            behavior:
                'Bạn thiếu thói quen học tập ổn định, dẫn đến phong độ thất thường. Khi có hứng bạn làm rất tốt, nhưng khi mất động lực bạn dễ bỏ ngang. Điều này làm giảm hiệu quả học dài hạn.'
        },
        sideEffects:
            'Bạn dễ bị giảm phong độ khi mất động lực hoặc gián đoạn việc học. Kiến thức và kỹ năng tốt nhưng không được duy trì khiến bạn không đạt điểm như mong muốn. Điều này có thể khiến bạn tiếc nuối vì không phát huy được hết khả năng.',
        prescription:
            'Bạn cần xây dựng một lịch học đều đặn và dễ thực hiện, không quá tải để tránh bỏ cuộc. Hãy kết hợp học tập với những hoạt động tạo hứng thú như học qua video, luyện test ngắn. Khi duy trì được thói quen, bạn sẽ phát huy được toàn bộ năng lực sẵn có.'
    },
    'Omega 3': {
        name: 'Omega 3',
        code: 'HLL',
        description: 'Người học có kiến thức nền tảng nhưng thiếu cả chiến lược làm bài và động lực/kỷ luật học tập.',
        image: 'Omega 3.png',
        ingredients: {
            knowledge:
                'Bạn có lượng kiến thức nền ở mức khá, đủ để hiểu bài và xử lý các câu cơ bản. Tuy nhiên, kiến thức của bạn chưa được hệ thống nên đôi khi hiểu không trọn vẹn. Điều này gây khó khăn khi gặp câu nâng cao hoặc cần suy luận.',
            skills:
                'Bạn thiếu kỹ năng xử lý đề thi, dẫn đến phản xạ chậm và dễ bị áp lực thời gian. Bạn thường không biết nên áp dụng chiến thuật nào cho từng dạng bài. Điều này khiến điểm số không ổn định và khó đạt mức cao.',
            behavior:
                'Bạn thiếu sự kỷ luật trong học tập và đôi khi thiếu quyết tâm để duy trì tiến độ. Việc học chưa trở thành thói quen nên rất dễ gián đoạn. Điều này dẫn đến tiến bộ chậm và thiếu bền vững.'
        },
        sideEffects:
            'Bạn có kiến thức nhưng không biết cách dùng hiệu quả trong bài thi, gây lãng phí năng lực. Thiếu động lực khiến bạn khó duy trì quá trình học. Điều này dễ dẫn đến cảm giác “mình biết mà không làm được”.',
        prescription:
            'Bạn cần tập trung rèn kỹ năng làm bài thi và hình thành thói quen học tập ổn định. Hãy luyện đề theo từng dạng và đặt mục tiêu nhỏ mỗi ngày. Khi kỹ năng và thái độ được cải thiện, kiến thức của bạn sẽ phát huy tối đa hiệu quả.'

    },
    'Sugar Pill': {
        name: 'Sugar Pill',
        code: 'LHL',
        description: 'Người học có chiến lược làm bài tương đối, nhưng thiếu kiến thức nền và hành vi học tập tích cực.',
        image: 'Sugar Pill.png',
        
        ingredients: {
            knowledge:
                'Kiến thức nền của bạn yếu và chưa đủ để giải quyết nhiều dạng bài nâng cao. Bạn thường hiểu một phần nhưng không đầy đủ, dẫn đến dễ nhầm lẫn. Bạn cần thời gian xây dựng lại gốc rễ vững chắc.',
            skills:
                'Bạn có kỹ năng làm bài tương đối tốt và có thể xử lý nhiều dạng bài dựa vào chiến thuật. Tuy nhiên, thiếu kiến thức khiến kỹ năng của bạn không ổn định. Khi gặp đề yêu cầu hiểu sâu, bạn dễ bị “đứng hình”.',
            behavior:
                'Bạn thiếu động lực duy trì việc học đều đặn nên thường bỏ dở giữa chừng. Thói quen học chưa ổn định khiến tiến bộ của bạn chậm và không bền vững. Điều này làm điểm số khó cải thiện.'
        },
        sideEffects:
            'Bạn dễ bị lệ thuộc vào mẹo thay vì kiến thức thật, dẫn đến kết quả không ổn định. Thiếu thái độ học tập tốt khiến bạn dễ mất phương hướng. Điều này khiến bạn khó tiến bộ dù đã cố gắng một phần.',
        prescription:
            'Bạn nên bắt đầu bổ sung kiến thức nền và tạo thói quen học tập tốt hơn. Kết hợp giữa kỹ năng và kiến thức mới sẽ giúp bạn ổn định kết quả. Hãy học theo lộ trình rõ ràng và kiểm tra tiến độ thường xuyên.'
    },
    'Bee Pollen': {
        name: 'Bee Pollen',
        code: 'LLH',
        description: 'Người học có động lực, tinh thần tốt nhưng thiếu cả kiến thức nền và kỹ năng/chiến lược làm bài thi.',
        image: 'Bee Pollen.png',
        
        ingredients: {
            knowledge:
                'Bạn thiếu kiến thức nền tảng nên thường gặp khó với bài tập cơ bản. Ngữ pháp và từ vựng cần được xây dựng lại từ đầu. Đây là lý do khiến bạn dễ bị rối khi học bài mới.',
            skills:
                'Bạn chưa có kỹ năng làm bài thi rõ ràng và thường xử lý câu hỏi theo cảm tính. Điều này khiến bạn mất thời gian và dễ mắc sai sót. Bạn cần học cách tiếp cận từng dạng bài một cách có phương pháp.',
            behavior:
                'Bạn có tinh thần học tập tốt và luôn sẵn sàng nỗ lực. Tuy nhiên, thiếu kiến thức và kỹ năng khiến bạn dễ cảm thấy quá tải. Bạn cần sự hướng dẫn bài bản để phát huy động lực.'
        },
        sideEffects:
            'Bạn phải cố gắng nhiều nhưng kết quả thường không phản ánh nỗ lực. Điều này dễ khiến bạn nản lòng nếu không được hỗ trợ đúng cách. Cảm giác “cố lắm nhưng vẫn không giỏi lên” có thể ảnh hưởng đến tinh thần học lâu dài.',
        prescription:
            'Bạn nên bắt đầu từ việc học lại căn bản với lộ trình rõ ràng. Hãy xây dựng kiến thức từ từ và luyện kỹ năng theo từng dạng nhỏ. Khi bạn có nền móng vững, thái độ tích cực sẽ giúp bạn tiến rất nhanh. Đây là nhóm có tiềm năng phát triển mạnh nếu có phương pháp đúng.'
        }
};
